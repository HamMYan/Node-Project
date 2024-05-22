module.exports = (sequelize,Sequelize) => {
    const Order = sequelize.define('order',{
        count: Sequelize.INTEGER,
        price: Sequelize.INTEGER,
        name: Sequelize.STRING
    })
    return Order
}