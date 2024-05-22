const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_project2', 'user', 'Pass@1234', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

const User = require('./user')(sequelize, Sequelize);
const Category = require('./category')(sequelize, Sequelize);
const Product = require('./product')(sequelize, Sequelize);
const ProductImage = require('./product_image')(sequelize, Sequelize);
const WishList = require('./wish_List')(sequelize, Sequelize);
const Order = require('./order')(sequelize, Sequelize);
const FeedBack = require('./feedBack')(sequelize, Sequelize);

ProductImage.belongsTo(Product, { onDelete: 'cascade' });
Product.belongsTo(Category, { onDelete: 'cascade' });
Product.belongsTo(User, { onDelete: 'cascade' });
WishList.belongsTo(User, { onDelete: 'cascade' });
WishList.belongsTo(Product, { onDelete: 'cascade' });
Order.belongsTo(Product);
Order.belongsTo(User, { onDelete: 'cascade' });
FeedBack.belongsTo(User, { onDelete: 'cascade' });
FeedBack.belongsTo(Product, { onDelete: 'cascade' });

User.hasMany(Order);
User.hasMany(Product);
Category.hasMany(Product);
Product.hasMany(ProductImage);

User.hasMany(WishList);
Product.hasMany(WishList);

sequelize.sync();

module.exports = {
  User,
  Product,
  ProductImage,
  Category,
  WishList,
  Order,
  FeedBack,
  sequelize,
};
