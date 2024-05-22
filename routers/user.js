const user = require('express').Router();
const MainController = require('../controller/MainController');
const UserController = require('../controller/UserController')
const { upload } = require('../uploads/config');


user.get('/profile', UserController.profile)
user.get('/getProductMy', UserController.getProductMy)
user.get('/addWishList/:id', UserController.addWishlist)
user.get('/getWishlistMy',UserController.getWishlistMy)
user.get('/myOrders',UserController.myOrder)
user.get('/getFeedbackByProductId/:id',UserController.getFeedbackByProductId)

user.post('/addFeedback/:id',UserController.addFeedback)
user.post('/addOrder/:id',UserController.addOrder)
user.post('/addProduct', upload.array('image'), UserController.addProduct)

user.delete('/deleteWishlistById/:id', UserController.deleteWishlistById)
user.delete('/deleteProductById/:id',UserController.deleteProduct)
user.delete('/deleteFeedbackByUserId/:id',UserController.deleteFeedbackByUserId)

user.put('/updateProduct/:id', upload.array('image'), UserController.updateProduct)

module.exports = user;
