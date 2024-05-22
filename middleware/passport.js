const passportJWT = require("passport-jwt");
const UserDto = require("../dtos/user-dto");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { User } = require('../model/index');

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();

opts.secretOrKey = process.env.JWT_REFRESH_SECRET;

module.exports = passport => {
    passport.use(
        new JWTStrategy(opts, async function (jwtPayload, cb) {
            return await User.findOne({
                where: {
                    id: jwtPayload.id
                }
            }).then(user => {
                const userDto = new UserDto(user);
                return cb(null, userDto);
            }).catch(err => {
                return cb(err);
            });
        })
    );
};