var canvas = document.getElementById("game");
var context = canvas.getContext("2d");


var MeteorB=[];
var expl=[];
var Timer = 0;
var score = 0;


//загрузка данных
var bgnimg = new Image();
bgnimg.src = "Images/bgn1.png";

var meteor1 = new Image();
meteor1.src = "Images/meteor1.png";

var explosion = new Image();
explosion.src = "Images/explosion.png";

var animy=0,animx=0;

var mouseX = 0;
var mouseY = 0;

explosion.onload = function () {
   render();
}

function startGame() {
    document.getElementById("knopka").style.visibility = "hidden";
    game();
}

function game() {
    update();
    render();
    requestAnimationFrame(game);

}

function update() {
Timer++;
if(Timer%100==0){
        //new
        const newMeteor = new meteor(Math.random()*(1700-105)+105,-50,Math.random()*0.5-0.5,Math.random()*(2-1)+1 );
        MeteorB.push(newMeteor);
    }


    for (i in MeteorB) {

    //физика
        MeteorB[i].x = MeteorB[i].x + MeteorB[i].dx;
        MeteorB[i].y = MeteorB[i].y + MeteorB[i].dy;

        //столкновение стенами
        if (MeteorB[i].x >= 1750 || MeteorB[i].x < 105) MeteorB[i].dx = -MeteorB[i].dx;

        //столкновение с полом
        if (MeteorB[i].y >= 700){
            expl.push({x:MeteorB[i].x,y:MeteorB[i].y,animx:0,animy:0});
            MeteorB[i] = null; //new
            MeteorB.splice(i,1);
        }

        if (calcDistance(MeteorB[i].x+15,MeteorB[i].y+15,mouseX,mouseY) < 50) {
            console.log('remove!');
            console.log(calcDistance(MeteorB[i].x,MeteorB[i].y,mouseX,mouseY));
            expl.push({x:MeteorB[i].x,y:MeteorB[i].y,animx:0,animy:0});
            MeteorB[i] = null; //new
            MeteorB.splice(i,1);
            mouseX = 0;
            mouseY = 0;
        }
    }

    for (i in expl) {
        expl[i].animx=expl[i].animx+0.5;
        if (expl[i].animx>7) {expl[i].animy++; expl[i].animx=0}
        if (expl[i].animy>7)
            expl.splice(i,1);
    }
    
}

function render() {
    context.drawImage(bgnimg, 100, 25, 1720, 920);
    for (i in MeteorB) if (MeteorB[i].y>25) context.drawImage(meteor1, MeteorB[i].x, MeteorB[i].y, 60, 60);
    for (i in expl)
        context.drawImage(explosion, 100*Math.floor(expl[i].animx),100*Math.floor(expl[i].animy),100,100, expl[i].x, expl[i].y, 100, 100);
}


//NEW
//Класс - это функция с this.var_name вместо var var_name:
function meteor(x,y,dx,dy) {
    this.image = new Image();
    this.image.src = "Images/meteor1.png";
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
}

//new
document.onclick = function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
} 

function calcDistance(x1,y1,x2,y2) {
    return Math.pow(Math.pow(x1-x2,2)+Math.pow(y1-y2,2), 0.5);
}