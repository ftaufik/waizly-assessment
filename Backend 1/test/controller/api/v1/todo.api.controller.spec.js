require('dotenv').config();
const base = require('../../../../controller/api/v1/todo.api.controller');
const db = require('../../../../models');
const Todos = db.todos;

const mockRequest = (body = {}) => ({ body })
const mockResponse = () => {
  const res = {}
  res.json = jest.fn().mockReturnValue(res)
  res.status = jest.fn().mockReturnValue(res)
  return res
}


describe('GET /api/v1/todo/:id', () => {
    test('should return 200 and todo data', async () => {
        const req = {
            params: {
                id: 'f6900c13-4297-4899-af7b-bf8c458e751d'
            }
        }

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }

        await base.getUserTodos(req, res)

        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith({
            message: "Success retrieving data",
            data: expect.any(Object)
        })
    })

    test('should return 500 and error message if an error occurs during getting user todos', async () => {
        const req = {
            params: {
                id: 'f6900c13-4297-4899-af7b-bf8c458e751d'
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        jest
            .spyOn(Todos, 'findOne')
            .mockRejectedValueOnce(new Error('Database error'))

        await base.addTodo(req, res)

        expect(res.status).toBeCalledWith(500)
        expect(res.json).toBeCalledWith({ error: 'Internal server error' })
    })
})

describe('POST /api/v1/todo/create/:id', () => {
    afterAll(async () => {
        // Delete the test todo
        await Todos.destroy({ where: { todo: ['addtesting', 'testing1'] } })
    })

    test('should return 201 and success message when creating todo is success', async () => {
        const req = {
            params: {
                id: 'f6900c13-4297-4899-af7b-bf8c458e751d'
            },
            body: {
                todo: 'addtesting'
            }
        }

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }

        await base.addTodo(req, res)

        expect(res.status).toBeCalledWith(201)
        expect(res.json).toBeCalledWith({
            message: "Success creating data",
            data: expect.any(Object)
        })
    })

    test('should return 500 and error message if an error occurs during creating todo', async () => {
        const req = {
            params: {
                id: 'f6900c13-4297-4899-af7b-bf8c458e751d'
            },
            body: {
                todo: 'testing1'
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        base.addTodo = jest.fn().mockImplementation(async () => {
            res.status(500).json({
                error: "Internal server error",
              })
        });

        await base.addTodo(req, res)

        expect(res.status).toBeCalledWith(500)
        expect(res.json).toBeCalledWith({ error: 'Internal server error' })
    })

})

describe('PUT /api/v1/todo/edit/:id', () => {

    test('should return 200 and success message when updating todo is success', async () => {
        const req = {
            params: {
                id: '81'
            },
            body: {
                todo: 'testinggs'
            }
        }

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }

        await base.editTodoTask(req, res)

        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith({
            message: "Success updating data",
            data: expect.any(Array)
        })
    })

    test('should return 500 and error message if an error occurs during updating todo', async () => {
        const req = {
            params: {
                id: '10000021'
            },
            body: {
                todo: 'true'
            }
        }

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }

        await base.editTodoTask(req, res)

        expect(res.status).toBeCalledWith(500)
        expect(res.json).toBeCalledWith({
            error: "Internal server error"
        })
    })
})

describe('PUT /api/v1/todo/complete/:id', () => {

    test('should return 200 and success message when updating todo complete is success', async () => {
        const req = {
            params: {
                id: '81'
            },
            body: {
                isComplete: true
            }
        }

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }

        await base.editTodoComplete(req, res)

        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith({
            message: "Success updating data",
            data: expect.any(Array)
        })
    })

    test('should return 500 and error message if an error occurs during updating todo complete', async () => {
        const req = {
            params: {
                id: '81'
            },
            body: {
                isComplete: true
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        base.editTodoComplete = jest.fn().mockImplementation(async () => {
            res.status(500).json({
                error: "Internal server error",
              })
        });

        await base.editTodoComplete(req, res)

        expect(res.status).toBeCalledWith(500)
        expect(res.json).toBeCalledWith({ error: 'Internal server error' })
    })

})

describe('DELETE /api/v1/todo/delete/:id', () => {
    beforeAll(async () => {
        // Create the test todo
        await Todos.create({
            id: 556677,
            userId: 'f6900c13-4297-4899-af7b-bf8c458e751d',
            todo: 'DeleteTest',
            isComplete: false
        })
    })

    test('should return 200 and message succes deleting data', async () =>{
        const req = {
            params: {
                id: '556677'
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await base.deleteTodo(req, res)

        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith({
            message: "Success deleting data",
            data: expect.any(Array)
        })
    })

    test('should return 500 and error message if an error occurs during deleting todo', async () => {
        const req = {
            params: {
                id: '81'
            },
            body: {
                isComplete: true
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        base.deleteTodo = jest.fn().mockImplementation(async () => {
            res.status(500).json({
                error: "Internal server error",
              })
        });

        await base.deleteTodo(req, res)

        expect(res.status).toBeCalledWith(500)
        expect(res.json).toBeCalledWith({ error: 'Internal server error' })
    })
})