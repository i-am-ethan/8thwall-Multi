// debug-console取得
const debugConsole = document.getElementById("debug-console")


// room-id取得
let clientSearch = location.search // urlの?以下取得
clientSearchArray = clientSearch.split("=") //=で分割
clientSearchArray.shift() //先頭を削除
let clientRoomId = clientSearchArray[0]; // room-idだけ取得



const socket = io.connect();





socket.on("connect", () => {

    console.log(socket.connected) // true of false

    const debugConsole02 = document.createElement("p")
    debugConsole02.innerHTML = "client-id:" + socket.id;
    debugConsole.appendChild(debugConsole02)
    const debugConsoleRoomId = document.createElement("p")
    debugConsoleRoomId.innerHTML = "your room-id:"+ clientRoomId;
    debugConsole.appendChild(debugConsoleRoomId)
})





window.addEventListener('load', ()=>{ //ロード時に同期したことを知らせる関数

    let roomid = clientSearchArray[0]; //room-id取得


    console.log("loadしました");

    socket.emit('client_to_server_join', roomid)


    const displayDebugConsole = () => { // roomidをdebugConsoleに表示する関数
        const debugConsole03 = document.createElement("p")
        debugConsole03.innerHTML = "room-id:" + roomid;
        debugConsole.appendChild(debugConsole03)
        console.log(roomid)
    }
    setTimeout(displayDebugConsole,3000)


})




// 8th-wall
// ------------------------------------------------------------------------------------

AFRAME.registerComponent('random-cube-generator', {
    init() {
        let scene = this.el.sceneEl;
        let data = this.data; 
        
  
        const randomCubeColor = ["red", "blue", "green", "yellow", "black", "white", "pink", "orange"]
        const random = Math.floor(Math.random()*7)
  
        const newCube = document.createElement("a-box")
      
        newCube.setAttribute("color", `${randomCubeColor[random]}`)
        newCube.setAttribute("scale", "3 3 3")
        newCube.setAttribute("class", "cantap")
        newCube.setAttribute("xrextras-hold-drag", "")
        newCube.setAttribute("xrextras-two-finger-rotate", "")
        newCube.setAttribute("xrextras-pinch-scale", "")

        scene.appendChild(newCube)

        sendGenarateBox(newCube)

        console.log("data:"+data)


        function sendGenarateBox(newCube){
            let socketdata = {}
            let block = []
            block.push({color: `${randomCubeColor[random]}`})
            // block.push({position: data.pos.x+" "+data.pos.y+" "+data.pos.z});
            block.push({scale: "3 3 3"});
            socketdata["block"] = block;
            socket.emit("generate_box", JSON.stringify(socketdata));//Socket.ioサーバーへ送信

        }

      
      }
}) 