module.exports = (sequelize,Sequelize) => {
    const Category = sequelize.define('category',{
        name: Sequelize.STRING,
        image: Sequelize.STRING
    })
    return Category
}