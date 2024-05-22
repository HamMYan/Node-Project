module.exports = (sequelize,Sequelize) => {
    const wishList = sequelize.define('wish_list',{})
    return wishList
}