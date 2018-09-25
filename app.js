var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fork = require('child_process').fork;

var index = require('./routes/index');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var socketIo=require('./io')(io);


var tcpServer=fork('./tcp/index'); // 这是与单片机交互的tcp服务

tcpServer.on('message',function(msg){
  if(msg=='new a tcp serve'){
    tcpServer=fork('./tcp/index');
  }else{
    // msg就是单片机传递过来的数据
    fs.appendFile('./data',msg+'\n',function(err){
      if(err){
        console.log('写文件出错了~');
      }
      console.log('写文件成功~');
    })
    socketIo.send(msg);
    console.log(msg)
  }
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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




module.exports = {app,server};
