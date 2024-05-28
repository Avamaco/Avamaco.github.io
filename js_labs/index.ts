var obrazki: Record<string, Record<string, string>[]> = {
    "obrazki":[]
};

function getOffset(el : HTMLElement) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + 2*window.scrollX,
      top: rect.top + 2*window.scrollY,
    };
  }

function drawRects(){
    let s = ''
    for(let i = 0;i<obrazki['obrazki'].length;i++){
        let rect = obrazki['obrazki'][i]
        s = s + "<rect x='"+rect['x']+"' y='"+rect['y']+"' width='"+rect['w']+"' height='"+rect['h']+"' fill='"+rect['color']+"'></rect>\n"
    }
    document.getElementById("obrazek")!.innerHTML = s
}

function addRect(x1: number, y1: number, x2: number, y2: number, color: string){
    if(x1==x2 || y1==y2){
        return
    }
    let w = Math.max(x1,x2)-Math.min(x1,x2)
    let h = Math.max(y1,y2)-Math.min(y1,y2)
    let rect = {"x":Math.min(x1,x2).toString(),"y":Math.min(y1,y2).toString(),"w":w.toString(),"h":h.toString(),"color":color}
    obrazki['obrazki'].push(rect)
    drawRects()
}

function delRect(x : number,y: number){
    for(let i = obrazki['obrazki'].length-1;i>=0;i--){
        
        let rect = obrazki['obrazki'][i]
        if (parseInt(rect['x'])<=x && x<=parseInt(rect['x'])+parseInt(rect['w']) && parseInt(rect['y'])<=y && y<=parseInt(rect['y'])+parseInt(rect['h'])){

            if(obrazki['obrazki'].length>1){
                obrazki['obrazki'].splice(i,1)
            }
            else{
                obrazki['obrazki']=[]
            }
            
            drawRects()
            break
        }
    }

}

drawRects()


let x1=0
let y1=0
let x2=0
let y2=0
let x_del=-1
let y_del=-1

document.getElementById("obrazek")!.onmousedown = function(e){
    var rect = getOffset(document.getElementById("obrazek")!)
    x1 = e.clientX - rect.left
    y1 = e.clientY - rect.top
}

document.getElementById("obrazek")!.onmouseup = function(e){
    var rect = getOffset(document.getElementById("obrazek")!)
    x2 = e.clientX - rect.left
    y2 = e.clientY - rect.top
    var color = (<HTMLInputElement>document.getElementById('color')).value
    if(color==""){
        color="black"
    }
    addRect(x1,y1,x2,y2,color)
}

document.getElementById("obrazek")!.onclick = function(e){
    var rect = getOffset(document.getElementById("obrazek")!)
    x_del=e.clientX - rect.left
    y_del=e.clientY - rect.top
}

document.getElementById("usun")!.onclick = function(){
    delRect(x_del,y_del)
}

document.getElementById("send")!.onclick = function(){
    const fetchPromise = fetch("http://127.0.0.1:8000/pics/", {
        method: "POST",
        mode :"cors",
        headers: {
            "Access-Control-Allow-Origin": 'http://127.0.0.1:3000',
            "Accept" : "application/json",
            "Content-Type": "application/json",
            
            
        },
        body: JSON.stringify(obrazki['obrazki']),
    });

    fetchPromise.then((response) => {
        console.log(response.json);
    });

}