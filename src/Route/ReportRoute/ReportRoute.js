const express = require('express');
const ReportRouter = express.Router();


const reportGetController = require('../../Controller/ReportController/reportGetController');
const reportPostController = require('../../Controller/ReportController/reportPostController');
const reportPatchByIdController = require('../../Controller/ReportController/reportPatchByIdController');


ReportRouter.get('/reportedProperties', reportGetController);
ReportRouter.post('/reportedProperties', reportPostController);
ReportRouter.patch('/reportedProperties/:id', reportPatchByIdController);






module.exports = ReportRouter;