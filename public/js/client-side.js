//debug-console取得
const debugConsole = document.getElementById("debug-console")
debugConsole.innerHTML = "client.js reloaded"

console.log("client.js reloaded")

const socket = io.connect();

socket.on("connect", () => {
    console.log(socket.id)
})