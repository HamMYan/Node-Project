const { User, Category, Product, ProductImage, WishList, Order, FeedBack } = require('../model');

class UserController {
  constructor() {
    throw new Error('UserController is abstract class');
  }
  static async addProduct(req, res) {
    try {
      const { categoryId, ...prod } = req.body;
      const cat = await Category.findByPk(categoryId);
      if (cat) {
        if (req.files && req.files.length) {
          const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            acive: req.body.acive,
            description: req.body.description,
            categoryId: req.body.categoryId,
            userId: req.user.id
          });
          for (let e of req.files) {
            await ProductImage.create({
              productId: product.id,
              picUrl: e.filename,
            });
          }
          res.send({ message: 'Add product' });
        } else {
          res.send({ message: 'images invalid' });
        }
      } else {
        res.send({ message: 'category not found' });
      }
    } catch (err) {
      res.send({ message: err.message });
    }
  }
  static async profile(req, res) {
    res.send(req.user)
  }
  static async getProductMy(req, res) {
    try {
      const myProducts = await Product.findAll({
        where: {
          userId: req.user.id
        },
        include: [
          {
            model: ProductImage
          }
        ]
      });
      res.send({ message: myProducts })
    }
    catch (err) {
      res.send({ message: err.message })
    }
  }
  static async updateProduct(req, res) {
    try {
      const updProduct = await Product.update(
        {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          categoryId: req.body.categoryId,
        },
        {
          where: {
            id: req.params.id,
            userId: req.user.id
          }
        }
      )
      for (let e of req.files) {
        await ProductImage.update(
          {
            picUrl: e.filename,
          },
          {
            where: {
              productId: req.params.id
            }
          }
        );
      }
      res.send({ message: "Product updated" })
    }
    catch (err) {
      res.send({ message: err.message })
    }
  }
  static async deleteProduct(req, res) {
    try {
      await Product.destroy({
        where: {
          id: req.params.id,
          userId: req.user.id
        }
      })
      res.send({ message: "Product deleted" })
    }
    catch (err) {
      res.send({ message: err.message })
    }
  }
  static async addWishlist(req, res) {
    try {
      await WishList.create({
        userId: req.user.id,
        productId: req.params.id
      })
      res.send({ message: "Wish list added" })
    }
    catch (err) {
      res.send({ message: err.message })
    }
  }
  static async getWishlistMy(req, res) {
    try {
      const myWishList = await WishList.findAll({
        where: {
          userId: req.user.id
        }
      })
      res.send({ message: myWishList })
    }
    catch (err) {
      res.send({ message: err.message })
    }
  }
  static async deleteWishlistById(req, res) {
    try {
      await WishList.destroy({
        where: {
          id: req.params.id,
          userId: req.user.id
        }
      })
      res.send({ message: "Wish list deleted" });
    } catch (err) {
      res.send({ message: err.message });
    }
  }
  static async addOrder(req, res) {
    try {
      await Order.create({
        userId: req.user.id,
        productId: req.params.id,
        count: req.body.count,
        price: req.body.price,
        name: req.body.name,
      })
      res.send({message: "Your order is added"})
    }
    catch (err) {
      res.send({ message: err.message })
    }
  }
  static async myOrder(req,res){
    try{
      const orders = await Order.findAll({
        where:{
          userId: req.user.id
        }
      })
      res.send(orders)
    }
    catch (err) {
      res.send({ message: err.message })
    }
  }
  static async addFeedback(req,res){
    try{
      await FeedBack.create({
        text: req.body.text,
        rate: req.body.rate,
        userId: req.user.id,
        productId: req.params.id,
      })
      res.send({message: "Your fedback  added"})
    }
    catch (err) {
      res.send({ message: err.message })
    }
  }
  static async getFeedbackByProductId(req,res){
    try{
      const feedBack = await FeedBack.findAll({
        where: {
          productId: req.params.id
        }
      })
      res.send(feedBack)
    }
    catch (err) {
      res.send({ message: err.message })
    }
  }
  static async deleteFeedbackByUserId(req, res) {
    try {
      await FeedBack.destroy({
        where: {
          id: req.params.id
        }
      });
      res.send({ message: "Feedback deleted" });
    } catch (err) {
      res.send({ message: err.message });
    }
  }
  
}

module.exports = UserController;
