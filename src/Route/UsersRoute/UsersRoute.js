const express = require('express');
const UsersRouter = express.Router();

const usersGetController = require('../../Controller/UsersController/usersGetController');
const usersPostController = require('../../Controller/UsersController/usersPostController');
const usersDeleteController = require('../../Controller/UsersController/usersDeleteController');
const usersAdminPatchController = require('../../Controller/UsersController/usersAdminPatchController');
const usersFraudPatchController = require('../../Controller/UsersController/usersFraudPatchController');
const usersJwtPostController = require('../../Controller/UsersController/usersJwtPostController');
const usersAdminGetByEmailController = require('../../Controller/UsersController/usersAdminGetByEmailController');
const verifyToken = require('../../Middleware/verifyToken');
const usersAgentGetByEmailController = require('../../Controller/UsersController/usersAgentGetByEmailController');
const verifyAdmin = require('../../Middleware/verifyAdmin');
const usersAdminStatsGetController = require('../../Controller/UsersController/usersAdminStatsGetController');



UsersRouter.get('/users', verifyToken, verifyAdmin, usersGetController);
UsersRouter.get('/user/admin/:email', verifyToken, usersAdminGetByEmailController);
UsersRouter.get('/user/agent/:email', verifyToken, usersAgentGetByEmailController);
UsersRouter.get('/admin-stats', usersAdminStatsGetController);
UsersRouter.post('/users', usersPostController);
UsersRouter.post('/jwt', usersJwtPostController);
UsersRouter.delete('/users/:id', usersDeleteController);
UsersRouter.patch('/users/admin/:id', usersAdminPatchController);
UsersRouter.patch('/users/fraud/:id', usersFraudPatchController);




module.exports = UsersRouter;