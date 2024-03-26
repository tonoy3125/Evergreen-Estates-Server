const express = require('express');
const WishlistRouter = express.Router();

const wishlistGetController = require('../../Controller/WishlistController/wishlistGetController');
const wishlistGetByIdController = require('../../Controller/WishlistController/wishlistGetByIdController');
const wishlistGetByEmailController = require('../../Controller/WishlistController/wishlistGetByEmailController');
const wishlistPostController = require('../../Controller/WishlistController/wishlistPostController');
const wishlistDeleteByIdController = require('../../Controller/WishlistController/wishlistDeleteByIdController');



WishlistRouter.get('/wishlist', wishlistGetController);
WishlistRouter.get('/wishlists/:id', wishlistGetByIdController);
WishlistRouter.get('/wishlister/:email', wishlistGetByEmailController);
WishlistRouter.post('/wishlist', wishlistPostController);
WishlistRouter.delete('/wishlist/:id', wishlistDeleteByIdController);





module.exports = WishlistRouter;