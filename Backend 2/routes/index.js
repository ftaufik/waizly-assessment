const router = require('express').Router();

const userRoutes = require('./api/v1/user.routes')
const todoRoutes = require('./api/v1/todo.routes')

// API
router.group("/api/v1", route => {
    route.use('/user', userRoutes)
    route.use('/todo', todoRoutes);
});

module.exports = router