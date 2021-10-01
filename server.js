const express = require('express'); //expressモジュールの読み込み
const app = express(); //expressアプリケーションの作成
const http = require('http').Server(app); //httpモジュールの読み込み
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;




console.log("server.js was loaded")


app.use(express.static('public'));//ルートの静的ファイルへのアクセス許可


http.listen(PORT, ()=>{
    console.log('server listening..... Port:' + PORT)
})


app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.get('/multi', (req, res)=>{
    res.sendFile(__dirname + '/multi.html')
})



io.on('connection', (socket)=>{
    console.log(socket.id) //server-side-id

    let roomid;

    // clientとserverが同期された時の処理
    socket.on('client_to_server_join', (data)=>{
        roomid = data;
        socket.join(roomid);
        io.to(roomid).emit('sync', data);
    })


    socket.on('generate_box', function(data) {
        //接続者全員にdataを送る(第一引数がイベント名、第二引数が送信する値)
        io.to(roomid).emit('generate_box', data);//roomidが同じ部屋に対して、makeblockのdataを送信する
      });







})