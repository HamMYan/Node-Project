const express = require("express")
const { User } = require("../model/index")
const router = express.Router()
const passport = require('passport');
const MainController = require("../controller/MainController");
const { body } = require("express-validator");
const Local = require("passport-local").Strategy

router.get('/profile', passport.authenticate('jwt', { session: false }), MainController.profile)

router.get('/getCategory', MainController.getCategory)
router.get('/getProducts', MainController.getProducts)

router.get('/getCategoryById/:id', MainController.getCategoryById)
router.get('/getProductsById/:id', MainController.getProductsById)
router.get('/getProductByCategoryId/:id', MainController.getProductByCategoryId)

router.post('/register', [
    body('name').notEmpty().withMessage('Enter your name'),
    body('surname').notEmpty().withMessage('Enter your surname'),
    body('email').notEmpty().withMessage('Enter your email'),
    body('password').notEmpty().withMessage('Enter your password'),
],
    MainController.register
)
router.post('/login', passport.authenticate('local'), MainController.login);


passport.use('local', new Local(
    async function (username, password, done) {
        try {
            let user = await User.findOne({
                where: {
                    email: username
                }
            })
            if (user) {
                done(null, user)
            } else {
                done(null, false)
            }
        } catch (err) { }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    let user = await User.findOne({
        where: {
            id: id
        }
    });
    done(null, user);
});

module.exports = router