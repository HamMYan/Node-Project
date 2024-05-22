module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        acive: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        },
        description: Sequelize.STRING,
    })
    return Product
}