function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
async function get_pic(nr: number){
    const response = await fetch("http://127.0.0.1:8000/pics/"+nr.toString(), {
        method: "GET",
        mode :"cors",
        headers: {
            "Access-Control-Allow-Origin": 'http://127.0.0.1:3000',
            "Accept" : "application/json",         
            
        },
    });
    const rects = await response.json()
    return rects
}
async function get_number_of_pics(){
    const response = await fetch("http://127.0.0.1:8000/pics", {
        method: "GET",
        mode :"cors",
        headers: {
            "Access-Control-Allow-Origin": 'http://127.0.0.1:3000',
            "Accept" : "application/json",         
            
        },
    });
    const cnt = await response.json()
    return cnt
}

function pic_err(svg_nr: number, msg: string){
    let s = '<p>'+msg+'</p>'
    let btn = "<button id = 'reload"+svg_nr.toString()+"'  type=\"button\" class=\"btn btn-warning\">Spróbuj ponownie</button>"
    document.getElementById("obrazek"+svg_nr.toString()+"_btn")!.innerHTML = btn
    document.getElementById("obrazek"+svg_nr.toString())!.innerHTML = s
    document.getElementById("reload"+svg_nr.toString())!.onclick = function(){
        document.getElementById("obrazek"+svg_nr.toString()+"_btn")!.innerHTML = ""
        document.getElementById("obrazek"+svg_nr.toString())!.innerHTML = "<div class=\"spinner-border\" role=\"status\"></div>"
        draw_pic(svg_nr)
    }
}

async function draw_pic(svg_nr: number){
    let nr = 0
    let rects = []
    try{
        nr = await get_number_of_pics()
        rects = await get_pic(getRandomInt(nr)+1)
    }
    catch(error){
        console.log("Wykryto błąd", error)
        return
    }
    
    let s =""
    if(rects['detail']!=undefined){
        pic_err(svg_nr,'Błąd podczas pobierania obrazka!')
        return
    }
    if(rects.length>10000){
        pic_err(svg_nr,'Pobrano za duży obrazek!')
        return
    }
    else{
        s = '<svg width="500" height="500" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" style="background-color:white">\n'
        for(let i = 0;i<rects.length;i++){
            let d=rects[i]
            s = s + "<rect x='"+d['x']+"' y='"+d['y']+"' width='"+d['w']+"' height='"+d['h']+"' fill='"+d['color']+"'></rect>\n"
        }
        s = s +'</svg>'
    }
    
    document.getElementById("obrazek"+svg_nr.toString())!.innerHTML = s
    

}




for(let i = 1;i<4;i++){
    draw_pic(i)
}


