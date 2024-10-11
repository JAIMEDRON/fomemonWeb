const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  };
const title=document.querySelector("h1");
title.innerHTML=[...title.innerHTML].map(
    (value, index, array)=>
        `<span class="${value==" "?"espacio":"contenido"}" style="animation-delay: ${index/(array.length-1)}s; color: hsl(${index*360/(array.length-1)} 100 50);">${value}</span>`
).join("");

const song=new Audio("./music/backgroundMusic.mp3");
song.loop=true;
function playSong(){
    if(song.paused){
        song.play()
    }else{
        song.pause()
    }
}

let babyAlive=true;

const baby = document.querySelector(".littleShit")
document.body.addEventListener("mousemove", e=>{
    if(!babyAlive)return;
    const {pageX,pageY}=e;
    baby.style = `top: ${pageY}px; left: ${pageX}px`;
})

const changes=document.querySelectorAll(".changesDiv>div");

changes.forEach(e=>{
    const button=e.querySelector("button");
    const text=e.querySelector("p")
    button.addEventListener("click",()=>{
        text.style.display= text.style.display=="none"?"block":"none";
    })
})

/**
 * @type {HTMLButtonElement}
 */
const killButton=document.querySelector(".kill")
let currentAudio=new Audio("./music/kaboom.MP3");
killButton.addEventListener("click",async ()=>{
    killButton.classList.add("disabled");
    if(babyAlive){
        killButton.src="./images/live.gif";
        currentAudio.pause();
        currentAudio=new Audio("./music/kaboom.MP3")
        currentAudio.play();
        document.body.classList.remove("hideMouse");
        babyAlive=false;
        await delay(160);
        baby.src="./images/explosion.gif";
        await delay(1600);
        baby.style.display="none";
        killButton.classList.remove("disabled");
        return;
    }
    currentAudio.pause();
    currentAudio=new Audio("./music/heaven.MP3");
    currentAudio.play();
    document.body.classList.add("hideMouse");
    baby.src="./images/dancing_baby.gif";
    babyAlive=true;
    baby.style.display="block";
    killButton.src="./images/kill.gif";
    killButton.classList.remove("disabled");
})
