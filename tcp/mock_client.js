/*模拟单片机发送tcp数据*/
let net = require('net');
function sendData(data){ // 字符串格式~
  let client =net.createConnection('3001',function(){
    console.log('服务器连接成功~');
    client.write(data);
  })
  
  client.on('data',function(data){
    console.log(data.toString());
    client.end();
  });
  
  client.on('end',function(){
    console.log('连接关闭了~');
  });
}

function createData(){
  return {
    time:new Date(),
    a:{
      I:30+parseInt(Math.random()*70),
      V:100+parseInt(Math.random()*200),
      P:30+parseInt(Math.random()*20),
      Q:25,
    },
    b:{
      I:30+parseInt(Math.random()*70),
      V:100+parseInt(Math.random()*200),
      P:30+parseInt(Math.random()*20),
      Q:10,
    },
    c:{
      I:30+parseInt(Math.random()*70),
      V:100+parseInt(Math.random()*200),
      P:30+parseInt(Math.random()*20),
      Q:30,
    },
    d:{
      I:30+parseInt(Math.random()*70),
      V:100+parseInt(Math.random()*200),
      P:30+parseInt(Math.random()*20),
      Q:20,
    },
    e:{
      I:30+parseInt(Math.random()*70),
      V:100+parseInt(Math.random()*200),
      P:30+parseInt(Math.random()*20),
      Q:15,
    }
  }
}
console.log(createData())
setInterval(function(){
  sendData(JSON.stringify(createData()));
},1500)

