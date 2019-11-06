const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const engine = require('ejs-locals');

const app = express();
const config = require('./config');
const routes = require('./app/routes');

mongoose.connect(config.dbURI);
app.use(express.static(path.join(__dirname, 'public')));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');


//path
app.use(express.static(path.join(__dirname, 'public')));


app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
  }),
);

app.use((req, res, next) => {
  if (req.user) {
    res.locals.userType = req.user.constructor.modelName;
  }
  return next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  limit: '30mb',
  extended: true,
}));

app.use(routes);

//routes
app.get("/test/login",(req,res)=>{
   res.render("login.ejs");
});


app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
