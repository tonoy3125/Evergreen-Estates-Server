const express = require('express');
const PropertyBroughtRouter = express.Router();


const propertyBroughtGetController = require('../../Controller/PropertyBroughtController/propertyBroughtGetController');
const propertyBroughtGetByIdController = require('../../Controller/PropertyBroughtController/propertyBroughtGetByIdController');
const propertyBroughtGetByAgentEmailController = require('../../Controller/PropertyBroughtController/propertyBroughtGetByAgentEmailController');
const propertyBroughtGetByBuyerEmailController = require('../../Controller/PropertyBroughtController/propertyBroughtGetByBuyerEmailController');
const propertyBroughtPostController = require('../../Controller/PropertyBroughtController/propertyBroughtPostController');
const propertyBroughtPutByRequestIdController = require('../../Controller/PropertyBroughtController/propertyBroughtPutByRequestIdController');
const propertyBroughtPatchByRequestIdController = require('../../Controller/PropertyBroughtController/propertyBroughtPatchByRequestIdController');


PropertyBroughtRouter.get('/propertyBrought', propertyBroughtGetController);
PropertyBroughtRouter.get('/paymentBrought/:id', propertyBroughtGetByIdController);
PropertyBroughtRouter.get('/propertyBroughts/:agentemail', propertyBroughtGetByAgentEmailController);
PropertyBroughtRouter.get('/propertyBroughtsUser/:buyeremail', propertyBroughtGetByBuyerEmailController);
PropertyBroughtRouter.post('/propertyBrought', propertyBroughtPostController);
PropertyBroughtRouter.put('/api/request/:requestId', propertyBroughtPutByRequestIdController);
PropertyBroughtRouter.patch('/api/reject/:requestId', propertyBroughtPatchByRequestIdController);





module.exports = PropertyBroughtRouter;