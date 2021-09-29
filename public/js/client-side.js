//debug-console取得
const debugConsole = document.getElementById("debug-console")
debugConsole.insertAdjacentHTML('beforeend', '<p>Paragraph</p>');

console.log("client.js reloaded")

const socket = io.connect();

socket.on("connect", () => {
    console.log(socket.id)
})