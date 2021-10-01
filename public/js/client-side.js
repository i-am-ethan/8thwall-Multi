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


socket.on("generate_box", (data) => {
    console.log("socket.on generate_box")
    let cubeData = JSON.parse(data)
    let cube = cubeData.cube;
    let newCube = document.createElement("a-box");
    newCube.setAttribute("color", cube[0].color)
    newCube.setAttribute("color", cube[1].position)
    newCube.setAttribute("color", cube[2].scale)
    console.log("cubeの配列"+JSON.stringify(cube))
    //cubeの配列[{"color":"green"},{"position":"3 0 0"},{"scale":"3 3 3"}]
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
        
        var el = this.el; //elements取得
        var data = this.data; //data取得

        let scene = this.el.sceneEl;

  
        const randomCubeColor = ["red", "blue", "green", "yellow", "black", "white", "pink", "orange"]
        const random = Math.floor(Math.random()*7)
  

        const makeCube = () => {

            
            const newCube = document.createElement("a-box")
            newCube.setAttribute("color", `${randomCubeColor[random]}`)
            newCube.setAttribute("scale", "3 3 3")
            newCube.object3D.position.set(3, 0, 0)
            newCube.setAttribute("class", "cantap")
            newCube.setAttribute("xrextras-hold-drag", "")
            newCube.setAttribute("xrextras-two-finger-rotate", "")
            newCube.setAttribute("xrextras-pinch-scale", "")
            console.log(newCube.object3D.position)
            scene.appendChild(newCube)
            
            sendGenarateBox(newCube)

            setTimeout(makeCube, 5000)
            
        }
        makeCube()


        function sendGenarateBox(newCube){
            let socketdata = {} //socket-data objectを生成
            let cube = [] //cube配列生成
            cube.push({color: `${randomCubeColor[random]}`}) //cube配列に押し込んでいく
            cube.push({position: newCube.object3D.position.x +" "+newCube.object3D.position.y+" "+newCube.object3D.position.z}) //cube配列に押し込んでいく
            cube.push({scale: "3 3 3"});
            socketdata["cube"] = cube; //socket-dataオブジェクトにcubeを押し込む
            socket.emit("generate_box", JSON.stringify(socketdata));//generate_boxという名前でsocket-dataをSocket.ioサーバーへ送信

        }

      
      }
}) 




