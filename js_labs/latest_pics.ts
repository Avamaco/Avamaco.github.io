var ws = new WebSocket("ws://127.0.0.1:8000/ws");
ws.onmessage = function(event) {
    let latest = JSON.parse(event.data)
    for(let i = 0;i<3;i++){
        var pic=latest[i]
        let s = '<svg width="500" height="500" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" style="background-color:white">\n'
        for(let j = 0;j<pic.length;j++){
            let d=pic[j]
            s = s + "<rect x='"+d['x']+"' y='"+d['y']+"' width='"+d['w']+"' height='"+d['h']+"' fill='"+d['color']+"'></rect>\n"
        }
        s = s +'</svg>'
        document.getElementById("obrazek"+(i+1).toString()).innerHTML = s
    }
};
function sendMessage(event) {
    var input = (<HTMLInputElement>document.getElementById("messageText"))
    ws.send(input.value)
    input.value = ''
    event.preventDefault()
}


ws.addEventListener("error", (event) => {
    console.log("WebSocket error: ", event);
});

window.onbeforeunload = function() {
    ws.onclose = function () {}; // disable onclose handler first
    ws.close();
};