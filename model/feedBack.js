module.exports = (sequelize,Sequelize) => {
    const FeedBack = sequelize.define('feedBack',{
        text: Sequelize.STRING,
        rate: Sequelize.DOUBLE
    })
    return FeedBack
}