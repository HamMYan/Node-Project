const jwt = require('jsonwebtoken');
const { User } = require('../model/index');

class TokenService {
    static generateToken(payload) {
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '25m'
        })
        return {
            refreshToken
        }
    }
    static validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData
        } catch (e) {
            return null
        }
    }
    static async saveToken(id, refreshToken) {
        const tokenData = await User.findOne({
            where: {
                id: id
            }
        })
        if (tokenData) {
            await User.update({
                refreshToken: refreshToken
            }, {
                where: {
                    id: id
                }
            })
        }
    }
    static async removeToken(refreshToken) {
        const tokenData = await User.update({
            refreshToken: null
        }, {
        where: {
                refreshToken
            }
        })
        return tokenData
    }
    static async findToken(refreshToken) {
        const tokenData = await User.findOne({ where: { refreshToken: refreshToken } })
        return tokenData
    }
}
module.exports = TokenService