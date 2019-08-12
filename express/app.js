var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');//引入index.js前台路由文件
var usersRouter = require('./routes/users'); //引入 users.js用户路由文件
var admin=require('./routes/admin');
var movie=require('./routes/movie');

var proxy = require('http-proxy-middleware');

var app = express();

// 三种环境，1 表示本地开发环境，2表示测试环境，3表示线上环境
var env = 1;

app.use('/api',proxy({
	target:'http://localhost:8080',
	changeOrigin:true
}));

app.use("*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"); 
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS"); 
    if (req.method === 'OPTIONS') {
        res.send(200) 
    } else {
        next() 
    } 
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');  

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter); //对users.js增加了一个新的路由设置
app.use('/admin',admin);
app.use('/movie',movie);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
