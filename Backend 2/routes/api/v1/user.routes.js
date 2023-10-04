const userControllerAPI = require('../../../controller/api/v1/user.api.controller')

const router = require("express").Router()
require("express-group-routes");

router.post('/register', userControllerAPI.register)
router.post('/login', userControllerAPI.login)

module.exports = router;