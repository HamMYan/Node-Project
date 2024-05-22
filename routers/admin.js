const admin = require('express').Router();
const AdminController = require('../controller/AdminController');
const { upload } = require('../uploads/config');

admin.get('/profile', AdminController.profile);
admin.get('/getUsers',AdminController.getUsers);
admin.get('/getUserById/:id',AdminController.getUserById);


admin.patch('/updateCategory/:id', upload.single("image"), AdminController.updateCategory);
admin.put('/blockProductById/:id',AdminController.blockProductById)

admin.delete('/deleteUserById/:id',AdminController.deleteUserById)
admin.delete('/deleteCategory/:id', AdminController.deleteCategory);
admin.delete('/deleteProductById/:id',AdminController.deleteProductById)

admin.post('/addCategory', upload.single("image"), AdminController.addCategory);


module.exports = admin;
