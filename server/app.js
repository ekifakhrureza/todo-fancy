const express = require('express');
const app = express();
const logger = require('morgan')
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose =require ('mongoose')
mongoose.connect('mongodb://localhost/db_todo_fancy');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const index = require('./routes/index')
const users = require('./routes/users')
const todos = require('./routes/todos')
const { auth } = require('./middlewares/auth');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/',index)
app.use('/users',users)
app.use('/todos',auth,todos)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


  app.listen(3000, ()=>{
    console.log('App listen on port 3000');
    
})

  module.exports = app;