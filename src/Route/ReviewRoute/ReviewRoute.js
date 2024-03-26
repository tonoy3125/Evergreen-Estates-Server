const express = require('express');
const ReviewRouter = express.Router();

const reviewGetController = require('../../Controller/ReviewController/reviewGetController');
const reviewGetByEmailController = require('../../Controller/ReviewController/reviewGetByEmailController');
const reviewGetByProductIdController = require('../../Controller/ReviewController/reviewGetByProductIdController');
const reviewPostController = require('../../Controller/ReviewController/reviewPostController');
const reviewDeleteByIdController = require('../../Controller/ReviewController/reviewDeleteByIdController');



ReviewRouter.get('/review', reviewGetController);
ReviewRouter.get('/myreviews/:email', reviewGetByEmailController);
ReviewRouter.get('/reviewer/:productId', reviewGetByProductIdController);
ReviewRouter.post('/review', reviewPostController);
ReviewRouter.delete('/review/:id', reviewDeleteByIdController);





module.exports = ReviewRouter;