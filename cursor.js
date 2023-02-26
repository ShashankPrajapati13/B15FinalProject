
let outerCursor = document.querySelector(".outer-cursor");
let main = document.querySelector("body");

main.addEventListener("mousemove", moveCursor);

function moveCursor(e){
    let x = e.clientX;
    let y = e.clientY;
     outerCursor.style.left = `${x}px`;
     outerCursor.style.top = `${y}px`;
    console.log(x,y)
}
let anime = document.querySelectorAll("#anime");

console.log(anime)

anime.forEach(function(elem){
    elem.addEventListener("mouseover",function(dets){
        outerCursor.style.height="80px";
        outerCursor.style.width="80px";
    

    })
    
        elem.addEventListener("mouseleave",function(){
            outerCursor.style.height="25px";
            outerCursor.style.width="25px";
    
        })
    })

    