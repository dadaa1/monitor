module.exports=function(io){
  io.on('connection', function (socket) {
    console.log('有人打开网站~');
  });
  return {
    send:function(data){
      io.emit('msg',data);
    }
  }
}