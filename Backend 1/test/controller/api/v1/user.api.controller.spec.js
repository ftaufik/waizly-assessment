require('dotenv').config();
const base = require('../../../../controller/api/v1/user.api.controller');
const db = require('../../../../models');
const User = db.users;
const bcrypt = require('bcrypt');



describe('POST /api/v1/user/register', () => {

    test('should return 201 and success message when registration is successful', async () => {
        const req = {
            body: {
                username: 'user1234',
                password: 'user1234'
            }
        }
    
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
    
        await base.register(req, res)
    
        expect(res.status).toBeCalledWith(201)
        expect(res.json).toBeCalledWith({
            msg: 'Registrasi Berhasil'
        })
    })
  
    test('should return 409 and error message if username is already taken', async () => {
        const req = {
            body: {
                username: 'user1234',
                password: 'user1234'
            }
        }
    
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
    
        await base.register(req, res)
    
        expect(res.status).toBeCalledWith(409)
        expect(res.json).toBeCalledWith({
            msg: 'Username telah terpakai'
        })
    })
  
    test('should return 500 and error message if an error occurs during registration', async () => {
        const req = {
            body: {
                username: 'testuser',
                password: 'password123'
            }
        }

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }

        jest.spyOn(User, 'findOne').mockRejectedValueOnce(new Error('Database error'))

        await base.register(req, res)

        expect(res.status).toBeCalledWith(500)
        expect(res.json).toBeCalledWith({ error: 'Internal server error' })
    })
  })
  

describe('POST /api/v1/user/login', () => {
    afterAll(async () => {
        // Delete the test users
        await User.destroy({ where: { username: 'user1234' } })
    })
    afterEach(() => {
        User.findOne.mockRestore()
        jest.clearAllMocks()
    })

    test('should return 200 and success message when login is successful', async () => {
        const req = {
            body: {
                username: 'user1234',
                password: 'user1234'
            }
        }
    
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
    
        const user = {
            username: req.body.username,
            password: 'hashedPassword',
            id: 'userId'
        }
    
        User.findOne = jest.fn().mockResolvedValueOnce(user)
    
        bcrypt.compare = jest.fn().mockResolvedValueOnce(true)
    
        await base.login(req, res)
    
        expect(User.findOne).toHaveBeenCalledTimes(1)
        expect(User.findOne).toHaveBeenCalledWith({
            where: { username: req.body.username }
        })
    
        expect(bcrypt.compare).toHaveBeenCalledTimes(1)
        expect(bcrypt.compare).toHaveBeenCalledWith(
            req.body.password,
            user.password
        )
    
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith({
            msg: 'Login berhasil',
            data: {
                userId: expect.any(String),
                username: expect.any(String)
            }
        })
    })

    test('should return 404 and error message if username is not found', async () => {
        const req = {
            body: {
                username: 'nonexistent',
                password: 'user1234'
            }
        }

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }

        User.findOne = jest.fn().mockResolvedValueOnce(null)

        await base.login(req, res)

        expect(User.findOne).toHaveBeenCalledTimes(1)
        expect(User.findOne).toHaveBeenCalledWith({
            where: { username: req.body.username }
        })

        expect(res.status).toBeCalledWith(404)
        expect(res.json).toBeCalledWith({
            msg: 'Username Tidak Ditemukan'
        })
    })

    test('should return 400 and error message if password is incorrect', async () => {
        const req = {
            body: {
                username: 'user1234',
                password: 'incorrectPassword'
            }
        }
    
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
    
        const user = {
            username: req.body.username,
            password: 'hashedPassword',
            id: 'userId'
        }
    
        User.findOne = jest.fn().mockResolvedValueOnce(user)
    
        bcrypt.compare = jest.fn().mockResolvedValueOnce(false)
    
        await base.login(req, res)
    
        expect(User.findOne).toHaveBeenCalledTimes(1)
        expect(User.findOne).toHaveBeenCalledWith({
            where: { username: req.body.username }
        })
    
        expect(bcrypt.compare).toHaveBeenCalledTimes(1)
        expect(bcrypt.compare).toHaveBeenCalledWith(
            req.body.password,
            user.password
        )
    
        expect(res.status).toBeCalledWith(400)
        expect(res.json).toBeCalledWith({
            msg: 'Password Salah'
        })
    })

})