const db = require('../../../models');
const Todo = db.todos;
const User = db.users;
const { v4: uuidv4 } = require('uuid');

module.exports = {
    getUserTodos: async (req, res) => {
        const userId = req.params.id;
        try {
            const todos = await Todo.findAll({
                where: {
                    userId: userId
                }
            });

            res.status(200).json({
                message: "Success retrieving data",
                data: todos
            })

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal server error"})
        }
    },
    addTodo: async (req, res) => {
        const userId = req.params.id;

        try {
            const todos = await Todo.create({
                id: parseInt(uuidv4()),
                userId: userId,
                todo: req.body.todo,
                isComplete: false
            });

            const updatedTodo = await Todo.findAll({
                where: {
                    userId: userId
                }
            });

            res.status(201).json({
                message: "Success creating data",
                data: updatedTodo
            })

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal server error"})
        }
    },
    editTodoTask: async (req, res) => {
        const id = req.params.id;

        try {
            const todo = await Todo.findByPk(id);
            todo.todo = req.body.todo ? req.body.todo : todo.todo;
            await todo.save();

            const updatedTodo = await Todo.findAll({
                where: {
                    userId: todo.userId
                }
            });

            res.status(200).json({
                message: "Success updating data",
                data: updatedTodo
            })

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal server error"})
        }
    },
    editTodoComplete: async (req, res) => {
        const id = req.params.id;

        try {
            const todo = await Todo.findByPk(id);
            todo.isComplete = !todo.isComplete;
            await todo.save();

            const updatedTodo = await Todo.findAll({
                where: {
                    userId: todo.userId
                }
            });

            res.status(200).json({
                message: "Success updating data",
                data: updatedTodo
            })

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal server error"})
        }
    },
    deleteTodo: async (req, res) => {
        const id = req.params.id;
        try {
            const todo = await Todo.findByPk(id);
            const userId = todo.userId
            await todo.destroy();

            const updatedTodo = await Todo.findAll({
                where: {
                    userId: userId
                }
            });

            res.status(200).json({
                message: "Success deleting data",
                data: updatedTodo
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal server error"})
        }

    }
}