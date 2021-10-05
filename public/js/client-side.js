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
  
        const randomCubeColor = ["#ff3300", "#33ccff", "#00ff00", "#ffff00", "#000000", "#ffffff", "#ff0099", "#ff6600"]
        let random = Math.floor(Math.random()*7)
        let randomID = Math.floor(Math.random()*100)


        const newCube = document.createElement("a-box")
        newCube.setAttribute("color", "#ff3300")
        // newCube.setAttribute("color", `${randomCubeColor[random]}`)
        newCube.setAttribute("scale", "3 3 3")
        newCube.setAttribute('position', "0 0 0")
        newCube.setAttribute("class", "cantap")
        newCube.setAttribute("id", `created-box${randomID}`)
        newCube.setAttribute("xrextras-hold-drag", "")
        newCube.setAttribute("xrextras-two-finger-rotate", "")
        newCube.setAttribute("xrextras-pinch-scale", "")
        scene.appendChild(newCube)


        // 初回にboxをcreateする時の送信情報
        function sendGenarateBox(newCube){
            let socketdata = {} //socket-data objectを生成
            let cube = [] //cube配列生成
            cube.push({color: "#ff3300"}) //cube配列に押し込んでいく
            cube.push({position: newCube.object3D.position.x +" "+newCube.object3D.position.y+" "+newCube.object3D.position.z}) //cube配列に押し込んでいく
            cube.push({scale: "3 3 3"});
            cube.push({id: `created-box${randomID}`});
            // cube.push({id: `"${randomID}"`});
            socketdata["cube"] = cube; //socket-dataオブジェクトにcubeを押し込む
            socket.emit("generate_box", JSON.stringify(socketdata));//generate_boxという名前でsocket-dataをSocket.ioサーバーへ送信
        }
        sendGenarateBox(newCube) //500msに1回サーバーに送信する


        //２回目以降にboxの位置情報だけ送信する場合
        function sendBoxPosition(newCube){
            let socketdata = {} //socket-data objectを生成
            let cube = [] //cube配列生成
            cube.push({position: newCube.object3D.position.x +" "+newCube.object3D.position.y+" "+newCube.object3D.position.z}) //cube配列に押し込んでいく
            cube.push({id: `created-box${randomID}`});
            socketdata["cube"] = cube; //socket-dataオブジェクトにcubeを押し込む
            socket.emit("generate_box", JSON.stringify(socketdata));//generate_boxという名前でsocket-dataをSocket.ioサーバーへ送信
        }

        const hogehoge = () => {
            // console.log(newCube.object3D.position)
            // console.log("randomIDが一定に出てくるかを確認する:"+randomID)
            sendBoxPosition(newCube) //500msに1回サーバーに送信する
            setTimeout(hogehoge, 500)
        }
        hogehoge()


        let initialData = true;


        //情報を取得した時の処理
        socket.on("generate_box", (data) => { //sceneを認識する為にこの位置に設定
            // フラグを設定(true:get-attribute / false:create-element)
            console.log("initialData:"+initialData)
            if(!initialData){
                console.log("initialData:false")
                let cubeData = JSON.parse(data)
                let cube = cubeData.cube;
                console.log("cubeの配列(getAttribute)"+JSON.stringify(cube))
                let newCube = document.getElementById("box");
                if(!newCube){return}
                newCube.setAttribute("position", cube[0].position)
                newCube.setAttribute("id", cube[1].id)
                scene.appendChild(newCube)
            }
        
            // フラグがtrueのとき
            let cubeData = JSON.parse(data)
            console.log(cubeData)
            let cube = cubeData.cube;
            let newCube = document.createElement("a-box");
            newCube.setAttribute("color", cube[0].color)
            newCube.setAttribute("position", cube[1].position)
            newCube.setAttribute("scale", cube[2].scale)
            newCube.setAttribute("id", cube[3].id)
            scene.appendChild(newCube)
            console.log("cubeの配列"+JSON.stringify(cube))


            initialData = false
        })
 
      },

    
    
}) 




// AFRAME.registerComponent('foo', {
//     init: function () {
//       this.bar = 'baz';
//       console.log("read foo")
//     },
  
//     qux: function () {
//         var fooComponent = document.querySelector('[foo]').components.foo;
//         console.log(fooComponent.bar);
//         fooComponent.qux();
//     }
//   });