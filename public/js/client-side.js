//debug-console取得
const debugConsole = document.getElementById("debug-console")
const debugConsole01 = document.createElement("p")
debugConsole01.innerHTML = "test"
debugConsole.appendChild(debugConsole01)

console.log("client.js reloaded")

const socket = io.connect();

socket.on("connect", () => {
    const debugConsole02 = document.createElement("p")
    debugConsole02.innerHTML = "client-id:" + socket.id;
    debugConsole.appendChild(debugConsole02)
})