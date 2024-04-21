const boxes=document.querySelectorAll(".box");
const play=document.querySelector(".btn");
const h2=document.querySelector("h2");
const h1=document.querySelector("h1");
const body=document.querySelector("body");

let level=0;
let start=false;

let gameSeq=[];
let userSeq=[];

let colors=["red","green","purple","yellow"];

play.addEventListener("click",()=>{
    if(start==false){
        levelUp();
        start=true;
    }
})

function levelUp(){
    level++;
    userSeq=[];
    h2.innerText=`Level ${level}`;
    let rand=Math.floor(Math.random()*4);
    let randbox=colors[rand];
    // console.log(randbox)
    let box=document.querySelector(`.${randbox}`);
    // console.log(box);
    gameSeq.push(randbox);
    // console.log(gameSeq)
    btnflash(box);
}


for(box of boxes){
    box.addEventListener("click",btnpress);
}

function checkAns(idx){
    if(gameSeq[idx] === userSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        body.classList.add("gameOver");
        setTimeout(()=>{
            body.classList.remove("gameOver");
        },125);
        h2.innerText="Game over! Click play to start";
        h1.innerText=`Your Score is ${level-1}`;
        reset();
    }
}

function btnpress(){
   let btn=this;
   btnflash(btn);
   let userColor=btn.getAttribute("id");
//    console.log(userColor)
   userSeq.push(userColor)
//    console.log(userSeq)
   checkAns(userSeq.length-1);

}

function btnflash(box){
    box.classList.add("flash")
    setTimeout( ()=>{
        box.classList.remove("flash");
    },150)
}

function reset(){
    gameSeq=[];
    userSeq=[];
    start=false;
    level=0;
}