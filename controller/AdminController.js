const { Op } = require('sequelize');
const { User, Category, Product, ProductImage, WishList } = require('../model');
const UserDto = require("../dtos/user-dto");


class AdminController {
  constructor() {
    throw new Error('AdminController is abstract class');
  }
  static async profile(req, res) {
    res.send(req.user);
  }
  static async addCategory(req, res) {
    console.log(req.file);
    try {
      const category = await Category.findOne({
        where: {
          name: req.body.name,
        },
      });
      if (category) {
        res.send({ message: 'This category has arleady' });
      } else {
        await Category.create({
          name: req.body.name,
          image: req.file?.filename,
        });
        res.send({ message: 'Category added' });
      }
    } catch (err) {
      res.send({ message: err.message });
    }
  }
  static async deleteCategory(req, res) {
    try {
      await Category.destroy({
        where: {
          id: req.params.id
        }
      });
      res.send({ message: 'Category deleted' });
    } catch (err) {
      res.send({ message: err.message });
    }
  }
  static async updateCategory(req, res) {
    try {
      await Category.update(
        {
          name: req.body.name,
          image: req.file?.filename,
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      res.send({ message: "Category updated" })
    }
    catch (err) {
      res.send({ message: err.message })
    }
  }
  static async deleteUserById(req, res) {
    try {
      await User.destroy({
        where: {
          type: 0,
          id: req.params.id,
        }
      })
      res.send({ message: "User deleted" })
    }
    catch (err) {
      res.send({ message: err.message })
    }
  }
  static async deleteProductById(req, res) {
    try {
      await Product.destroy({
        where: {
          id: req.params.id
        }
      })
      res.send({ message: "Product deleted" })
    }
    catch (err) {
      res.send({ message: err.message })
    }
  }
  static async blockProductById(req, res) {
    try {
      await Product.update(
        {
          acive: 0
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      res.send({message: "Product Blocked"})
    }
    catch (err) {
      res.send({ message: err.message })
    }
  }
  static async getUsers(req, res) {
    try {
      const us = await User.findAll({
        where: {
          type: {
            [Op.ne]: 1
          }
        }
      });
      const users = new UserDto(...us)
      res.send(users)
    }
    catch (err) {
      res.send({ message: err.message })
    }
  }
  static async getUserById(req,res){
    try{
      const us = await User.findOne({
        where:{
          id: req.params.id
        }
      })
      const user = new UserDto(us)
      res.send(user)
    }
    catch(err){
      res.send({ message: err.message })
    }
  }
}


module.exports = AdminController;
