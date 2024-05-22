const { User, Category, Product, ProductImage, WishList } = require('../model');
const bcrypt = require("bcrypt")
const UserDto = require('../dtos/user-dto');
const crypto = require("crypto")
const tokenService = require("./../service/token-service")
const passport = require('passport');
const { transporter } = require('../email-service/config');
const { validationResult } = require('express-validator');



class MainController {
    constructor() {
        throw new Error('MainController is abstract class');
    }
    static async register(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.session.error = errors.array();
                const errorsObj = {};
                errors.array().forEach(err => errorsObj[err.path] = err.msg);
                res.send(errorsObj);
            }
            else {
                delete req.session.errors;
                const { name, surname, email, password } = req.body;
                const candidate = await User.findOne({ where: { email } });
                if (candidate) {
                    return res.send(`${email} is already exist!`);
                }
                const emailToken = await crypto.randomBytes(3).toString('hex').toUpperCase();
                const hashedPassword = bcrypt.hashSync(password, 10);
                const user = await User.create({ name, surname, email, password: hashedPassword, emailToken, type: 0 });
                const userDto = new UserDto({ ...user.dataValues });
                const tokens = tokenService.generateToken({ ...userDto });
                await tokenService.saveToken(userDto.id, tokens.refreshToken);
                res.cookie('refreshToken', tokens.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true
                });
            //     const url = `http://localhost:8080/verify?email=${userDto.email}&token=${emailToken}`;
            //     const mailOptions = {
            //         from: "hammkrtchyan7@gmail.com",
            //         to: "hammkrtchyan7@gmail.com",
            //         subject:
            //             "Shnrohakalutyun mer kayqum grancvelu hamar menq kotrelenq dzer hasshivy ha ha ha ha ha",
            //         html: `<h1>Welcome my dear ${userDto.name}</h1>
            //   <a href='${url}'>click</a>`,
            //     };

            //     transporter.sendMail(mailOptions, function (error, info) {
            //         if (error) {
            //             console.log(error);
            //         } else {
            //             console.log("Email sent: " + info.response);
            //         }
            //     });
                res.send(userDto);
            }
        } catch (e) {
            next(e);
        }
    }

    static async login(req, res) {
        try {
            if (req.user.isVerified == 1) {
                let comp = bcrypt.compareSync(req.body.password, req.user.password)
                if (comp) {
                    const userDto = new UserDto(req.user);
                    const tokens = await tokenService.generateToken({
                        ...userDto
                    });
                    await tokenService.saveToken(userDto.id, tokens.refreshToken);
                    res.cookie('refreshToken', tokens.refreshToken, {
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                        httpOnly: true
                    })
                    userDto.refreshToken = tokens.refreshToken
                    res.send(userDto)
                } else {
                    res.send({
                        error: 'Wrong Username and/or Password'
                    })
                }
            } else {
                res.send({
                    verify: 'You have to verify your email'
                })
            }
        } catch (err) {
            res.send({ message: err.message })
        }
    }
    static async profile(req, res) {
        try {
            res.send({ user: req.user })
        }
        catch (err) {
            res.send({ message: err.message })
        }
    }
    static async getCategory(req, res) {
        try {
            const categories = await Category.findAll()
            res.send({ message: categories })
        }
        catch (err) {
            res.send({ message: err.message })
        }
    }
    static async getCategoryById(req, res) {
        try {
            const categories = await Category.findByPk(req.params.id)
            res.send({ message: categories })
        }
        catch (err) {
            res.send({ message: err.message })
        }
    }
    static async getProducts(req, res) {
        try {
            const products = await Product.findAll({
                include: [
                    {
                        model: ProductImage
                    }
                ]
            })
            res.send({ message: products })
        }
        catch (err) {
            res.send({ message: err.message })
        }
    }
    static async getProductsById(req, res) {
        try {
            const products = await Product.findAll(
                {
                    include: [
                        {
                            model: ProductImage
                        }
                    ],
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            res.send({ message: products })
        }
        catch (err) {
            res.send({ message: err.message })
        }
    }
    static async getProductByCategoryId(req, res) {
        try {
            const products = await Product.findAll(
                {
                    include: [
                        {
                            model: ProductImage
                        }
                    ],
                },
                {
                    where: {
                        categoryId: req.params.id
                    }
                }
            )
            res.send({ message: products })
        }
        catch (err) {
            res.send({ message: err.message })
        }
    }
}

module.exports = MainController