module.exports = (sequelize,Sequelize) => {
    const ProductImgage = sequelize.define('product_image',{
        picUrl: Sequelize.STRING,
    })
    return ProductImgage
}