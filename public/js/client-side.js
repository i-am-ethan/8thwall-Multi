// debug-console取得
const debugConsole = document.getElementById("debug-console")


// room-id取得
let clientSearch = location.search // urlの?以下取得
clientSearchArray = clientSearch.split("=") //=で分割
clientSearchArray.shift() //先頭を削除
let clientRoomId = clientSearchArray[0]; // room-idだけ取得


const socket = io.connect();


socket.on("connect", () => {
    // console.log(socket.connected) // true of false

    const debugConsole02 = document.createElement("p")
    debugConsole02.innerHTML = "Client-id:" + socket.id;
    debugConsole.appendChild(debugConsole02)
    const debugConsoleRoomId = document.createElement("p")
    debugConsoleRoomId.innerHTML = "Room-id:"+ clientRoomId;
    debugConsole.appendChild(debugConsoleRoomId)

    socket.emit('client_to_server_join', socket.id)
})


socket.on("client_to_server_join", (data)=>{
    // console.log("dataです！！！！！！！"+data)
    const debugConsole03 = document.createElement("p")
    debugConsole03.innerHTML = "[IN]" + data + "が入室しました";
    debugConsole.appendChild(debugConsole03)
})



window.addEventListener('load', ()=>{ //ロード時に同期したことを知らせる関数

    let roomid = clientSearchArray[0]; //room-id取得
    socket.emit('join_room', roomid) // room-idを送信する

})



// 8th-wall
// ------------------------------------------------------------------------------------



AFRAME.registerComponent('random-cube-generator', {
    init() {
        let scene = this.el.sceneEl;
  
        // const randomCubeColor = ["#ff3300", "#33ccff", "#00ff00", "#ffff00", "#000000", "#ffffff", "#ff0099", "#ff6600"]
        // let random = Math.floor(Math.random()*7)
        let randomID = Math.floor(Math.random()*100)

        // newCube.setAttribute("color", `${randomCubeColor[random]}`)

        const newCube = document.createElement("a-box")
        newCube.setAttribute("color", "#ff3300")
        newCube.setAttribute("class", "cantap")
        newCube.object3D.position.set(0, 0, 0)
        newCube.object3D.scale.set(3, 3, 3)
        newCube.setAttribute("id", `created-box${randomID}`)
        newCube.setAttribute("xrextras-hold-drag", "")
        newCube.setAttribute("xrextras-two-finger-rotate", "")
        newCube.setAttribute("xrextras-pinch-scale", "")
        console.log(newCube.object3D.position)
        console.log(newCube.object3D.scale)
        scene.appendChild(newCube)



        // 初回にboxをcreateする時の送信情報
        function sendGenarateBox(newCube){
            let socketdata = {} //socket-data objectを生成
            let cube = [] //cube配列生成
            cube.push({color: "#ff3300"}) //cube配列に押し込んでいく
            cube.push({positionX: newCube.object3D.position.x}) //cube配列に押し込んでいく
            cube.push({positionY: newCube.object3D.position.y}) //cube配列に押し込んでいく
            cube.push({positionZ: newCube.object3D.position.z}) //cube配列に押し込んでいく
            // cube.push({position: newCube.object3D.position.x +" "+newCube.object3D.position.y+" "+newCube.object3D.position.z}) //cube配列に押し込んでいく
            cube.push({scaleX: "3"});
            cube.push({scaleY: "3"});
            cube.push({scaleZ: "3"});
            cube.push({id: `created-box${randomID}`});
            socketdata["cube"] = cube; //socket-dataオブジェクトにcubeを押し込む
            socket.emit("generate_box", JSON.stringify(socketdata));//generate_boxという名前でsocket-dataをSocket.ioサーバーへ送信
        }
        sendGenarateBox(newCube) //500msに1回サーバーに送信する


        const hogehoge = () => {
            console.log("動かした後のポジションを確認"+newCube.object3D.position)
            console.log("送信しているIDが正しいかの確認:"+randomID)
            sendGenarateBox(newCube) //500msに1回サーバーに送信する
            setTimeout(hogehoge, 10000) //10秒後に実行する
        }
        hogehoge()


        // 誰かが部屋に入ってきたときにこの処理を実装する
        //情報を取得した時の処理
        socket.on("generate_box", (data) => { //sceneを認識する為にこの位置に設定
            console.log(data)
            let cubeData = JSON.parse(data)
            let cube = cubeData.cube;
            let newCube = document.createElement("a-box");
            newCube.setAttribute("color", cube[0].color)
            newCube.object3D.position.set(cube[1].positionX, cube[2].positionY, cube[3].positionZ)
            newCube.object3D.scale.set(cube[4].scaleX, cube[5].scaleY, cube[6].scaleZ)
            newCube.setAttribute("id", cube[7].id)
            scene.appendChild(newCube)
            // console.log("cubeの配列"+JSON.stringify(cube))
            // console.log(scene)
            const deleteCube = () => {
            scene.removeChild(newCube)
            setTimeout(deleteCube, 10000)
            }
            setTimeout(deleteCube, 10000)
        })

      },

    
}) 