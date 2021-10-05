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

        // const ground = document.getElementById('ground')


  
        const randomCubeColor = ["#ff3300", "#33ccff", "#00ff00", "#ffff00", "#000000", "#ffffff", "#ff0099", "#ff6600"]

        // ground.addEventListener('click', (event)=> {

            let random = Math.floor(Math.random()*7)

            // const touchPoint = event.detail.intersection.point


            const newCube = document.createElement("a-box")
            newCube.setAttribute("color", "#ff3300")
            // newCube.setAttribute("color", `${randomCubeColor[random]}`)
            newCube.setAttribute("scale", "3 3 3")
            newCube.setAttribute('position', "0 0 0")
            newCube.setAttribute("class", "cantap")
            newCube.setAttribute("id", "box")
            newCube.setAttribute("xrextras-hold-drag", "")
            newCube.setAttribute("xrextras-two-finger-rotate", "")
            newCube.setAttribute("xrextras-pinch-scale", "")
            scene.appendChild(newCube)


            const hogehoge = () => {
                console.log(newCube.object3D.position)
                sendGenarateBox(newCube) //500msに1回サーバーに送信する
                setTimeout(hogehoge, 500)
            }
            hogehoge()

            // this.hoge = "hogehoge initだよ"



            
            function sendGenarateBox(newCube){
                let socketdata = {} //socket-data objectを生成
                let cube = [] //cube配列生成
                cube.push({color: "#ff3300"}) //cube配列に押し込んでいく
                cube.push({position: "0 0 0"}) //cube配列に押し込んでいく
                // cube.push({position: touchPoint.x +" "+touchPoint.y+" "+touchPoint.z}) //cube配列に押し込んでいく
                cube.push({scale: "3 3 3"});
                socketdata["cube"] = cube; //socket-dataオブジェクトにcubeを押し込む
                socket.emit("generate_box", JSON.stringify(socketdata));//generate_boxという名前でsocket-dataをSocket.ioサーバーへ送信
            }
        // })
  

        let initialData;

        socket.on("generate_box", (data) => { //sceneを認識する為にこの位置に設定
            // フラグを設定(true:get-attribute / false:create-element)
            console.log("initialData:"+initialData)
            if(!initialData){
                console.log("initialData:false")
                let cubeData = JSON.parse(data)
                let cube = cubeData.cube;
                let newCube = document.getElementById("box");
                newCube.setAttribute("color", cube[0].color)
                newCube.setAttribute("position", cube[1].position)
                newCube.setAttribute("scale", cube[2].scale)
                scene.appendChild(newCube)
            }
        

            console.log("socket.on generate_box")
            let cubeData = JSON.parse(data)
            console.log(cubeData)
            let cube = cubeData.cube;
            let newCube = document.createElement("a-box");
            newCube.setAttribute("color", cube[0].color)
            newCube.setAttribute("position", cube[1].position)
            newCube.setAttribute("scale", cube[2].scale)
            scene.appendChild(newCube)
            console.log("cubeの配列"+JSON.stringify(cube))

            initialData = false
        })

      
      },


      // 1秒間に60-120回
    //   tick(){
    //       console.log("tickがお呼ばれされています。")
    //     //   console.log(newCube.object3D.position)
    //     //   const hogehogeComponent = document.querySelector('[random-cube-generator]').components.random-cube-generator;
    //   }
    
    
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