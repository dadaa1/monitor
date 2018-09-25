/*创建TCP服务器*/  
var net = require('net');  
var server = net.createServer();  
server.on('connection',function (socket) {  
    socket.setEncoding('utf8');  
    console.log('客户端与服务端链接已建立');  
    socket.on('data',function (data) {  
      process.send(data);
      socket.write('已收到数据');// 发送给客户端  
    });
    // 监听客户端的end事件  
    socket.on('end',function () {  
        console.log('客户端连接被关闭');
    });
    socket.on('error',function(err){
      console.log(err);
    })
});

server.on('error',function(err){
  console.log(err);
  // 有错误时，通知父进程生成一个新的tcp服务器。
  process.send('new a tcp serve');
})
server.listen(3001);