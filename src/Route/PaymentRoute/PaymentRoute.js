const express = require('express');
const PaymentRouter = express.Router();

const paymentGetByAgentEmailController = require('../../Controller/PaymentController/paymentGetByAgentEmailController');
const paymentCreatePostController = require('../../Controller/PaymentController/paymentCreatePostController');
const paymentPostController = require('../../Controller/PaymentController/paymentPostController');



PaymentRouter.get('/payments/:agentemail', paymentGetByAgentEmailController);
PaymentRouter.post('/payments', paymentPostController);
PaymentRouter.post('/create-payment-intent', paymentCreatePostController);





module.exports = PaymentRouter;