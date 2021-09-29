const express = require('express'); //expressモジュールの読み込み
const app = express(); //expressアプリケーションの作成
const http = require('http').Server(app); //httpモジュールの読み込み
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

//debug-console
// const debugConsole = document.getElementById("debug-console")

console.log("server.js was reloaded")

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
    // const debugConsole02 = document.createElement("p")
    // debugConsole02.innerHTML = "server-id:" + socket.id;
    // debugConsole.appendChild(debugConsole02)

})