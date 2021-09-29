// debug-console取得
const debugConsole = document.getElementById("debug-console")


// room-id取得
let clientSearch = location.search
console.log(clientSearch)
clientSearchArray = clientSearch.split("=")
console.log(clientSearchArray)
clientSearchArray.shift() //先頭を削除
console.log(clientSearchArray)

let clientRoomId = clientSearchArray[0];
console.log("client-room-id:"+clientRoomId)
//?room=8080


const socket = io.connect();

socket.on("connect", () => {
    const debugConsole02 = document.createElement("p")
    debugConsole02.innerHTML = "client-id:" + socket.id;
    debugConsole.appendChild(debugConsole02)
})