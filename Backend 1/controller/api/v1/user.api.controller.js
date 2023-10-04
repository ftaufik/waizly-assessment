const db = require('../../../models');
const User = db.users;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");

module.exports = {
    register: async (req, res) => {
        const { username, password } = req.body;
    
        try {
            const userExist = await User.findOne({ 
                where: { username } 
            });

            if (userExist) {
                return res.status(409).json({ 
                    msg: "Username telah terpakai" 
                });
            }
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
        
            // Create a new user
            const newUser = await User.create({
                id: uuidv4(),
                username: req.body.username,
                password: hashedPassword
            });
        
            res.status(201).json({ msg: "Registrasi Berhasil" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        }
      },    
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({
                where: {
                  username
                }
            });

            if (!user) {
                return res.status(404).json({ msg: "Username Tidak Ditemukan" });
            }
        
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ msg: "Password Salah" });
            }

            const userId = user.id;

            res.status(200).json({ 
                msg: "Login berhasil",
                data: {
                    userId: userId,
                    username: user.username
                }
            });

        } catch (err) {
            // console.log(err);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}