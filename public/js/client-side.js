// debug-console取得
const debugConsole = document.getElementById("debug-console")


// url取得
const clientURL = location.href
console.log(clientURL)
const clientPathName = location.pathname
console.log(clientPathName)
const clientSearch = location.search
console.log(clientSearch)


const socket = io.connect();

socket.on("connect", () => {
    const debugConsole02 = document.createElement("p")
    debugConsole02.innerHTML = "client-id:" + socket.id;
    debugConsole.appendChild(debugConsole02)
})