module.exports = {
  isAdmin: (req, res, next) => {
    if (req.user.type == 1) {
      return next();
    }
    res.send('admin');
  },
  isUser: (req, res, next) => {
    if (req.user.type == 0) {
      return next();
    }
    res.send('user');
  },
};
