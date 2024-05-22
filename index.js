const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const router = require('./routers/router');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8080;
const cors = require('cors');
const user = require('./routers/user');
const admin = require('./routers/admin');
const { isUser, isAdmin } = require('./middleware/type');
require('dotenv').config();

app.use(express.static('public'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use(cors());
app.use(
  session({
    secret: 'topSecret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
require('./middleware/passport')(passport);

app.use('/', router);
app.use(
  '/user',
  passport.authenticate('jwt', { session: false }),
  isUser,
  user,
);
app.use(
  '/admin',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  admin,
);

app.listen(port, () => console.log(`listening  http://localhost:${port}`));
