const express = require('express');
const PropertyRouter = express.Router();


const propertyGetController = require('../../Controller/PropertyController/propertyGetController');
const propertyAdvertiseGetController = require('../../Controller/PropertyController/propertyAdvertiseGetController');
const propertyAdvertisementGetController = require('../../Controller/PropertyController/propertyAdvertisementGetController');
const propertyAdvertisePatchByIdController = require('../../Controller/PropertyController/propertyAdvertisePatchByIdController');
const propertyAdvertiseRemovePatchByIdController = require('../../Controller/PropertyController/propertyAdvertiseRemovePatchByIdController');
const propertyGetByVerifiedController = require('../../Controller/PropertyController/propertyGetByVerifiedController');
const propertyGetByAgentEmailController = require('../../Controller/PropertyController/propertyGetByAgentEmailController');
const propertyPostController = require('../../Controller/PropertyController/propertyPostController');
const propertyPatchByIdController = require('../../Controller/PropertyController/propertyPatchByIdController');
const propertyGetByIdController = require('../../Controller/PropertyController/propertyGetByIdController');
const propertyPutByIdController = require('../../Controller/PropertyController/propertyPutByIdController');
const propertyDeleteByIdController = require('../../Controller/PropertyController/propertyDeleteByIdController');


PropertyRouter.get('/property', propertyGetController);
PropertyRouter.get('/advertise', propertyAdvertiseGetController);
PropertyRouter.get('/properties/:id', propertyGetByIdController);
PropertyRouter.get('/propertys/verified', propertyGetByVerifiedController);
PropertyRouter.get('/postedproperty/:agentemail', propertyGetByAgentEmailController);
PropertyRouter.get('/advertisement', propertyAdvertisementGetController);
PropertyRouter.post('/property', propertyPostController);
PropertyRouter.patch('/property/:id', propertyPatchByIdController);
PropertyRouter.patch('/advertise/:id', propertyAdvertisePatchByIdController);
PropertyRouter.patch('/advertiseRemove/:id', propertyAdvertiseRemovePatchByIdController);
PropertyRouter.put('/properties/:id', propertyPutByIdController);
PropertyRouter.delete('/properties/:id', propertyDeleteByIdController);





module.exports = PropertyRouter;