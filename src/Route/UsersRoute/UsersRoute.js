const express = require('express');
const UsersRouter = express.Router();

const usersGetController = require('../../Controller/UsersController/usersGetController');
const usersPostController = require('../../Controller/UsersController/usersPostController');
const usersDeleteController = require('../../Controller/UsersController/usersDeleteController');
const usersAdminPatchController = require('../../Controller/UsersController/usersAdminPatchController');
const usersFraudPatchController = require('../../Controller/UsersController/usersFraudPatchController');



UsersRouter.get('/users', usersGetController);
UsersRouter.post('/users', usersPostController);
UsersRouter.delete('/users/:id', usersDeleteController);
UsersRouter.patch('/users/admin/:id', usersAdminPatchController);
UsersRouter.patch('/users/fraud/:id', usersFraudPatchController);




module.exports = UsersRouter;