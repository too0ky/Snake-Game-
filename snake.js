
const cvs = document.getElementById('snake');  
const ctx = cvs.getContext('2d');

//create the unit
const box = 32;

// set the speed
const speed = 250;


//load images

const ground3 = new Image();
ground3.src = "img/ground3.png";

const food2Img = new Image();
food2Img.src = "img/food2.png";

//load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let down = new Audio();
let right = new Audio();
let left = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

//create the food2

let food2 = {
    x: Math.floor(Math.random()*17+1) * box,
    y: Math.floor(Math.random()*15+3) * box,
}

// create the score var

let score = 0;

// create the gameOver

let gameOver = "Game Over!";


//control the snake

let d;

document.addEventListener("keydown", direction);

function direction(event){
    let key = event.keyCode;
    if(key == 37 && d != "RIGHT"){ 
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d="UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d !="UP"){
        d = "DOWN";
        down.play();
    }
}

// check collision function
function collision(head, array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i],x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

//draw everything to the canvas

function draw(){
    
    ctx.drawImage(ground3,0,0);
    
    for( let i = 0; i < snake.length; i++){
        ctx.fillStyle = ( i == 0 )? "red" : "white";
        ctx.fillRect(snake[i].x,snake[i].y, box, box);
        
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(food2Img, food2.x, food2.y); 
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction 
    if ( d == "LEFT") snakeX -= box;
    if ( d == "UP") snakeY -= box;
    if ( d == "RIGHT") snakeX += box;
    if ( d == "DOWN") snakeY += box;
    
    // if the snake eats the food2
    if(snakeX == food2.x && snakeY == food2.y){
        score++;
        eat.play();
        food2 = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        changeSpeed(score);
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    snake.unshift(newHead);
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
    
    // game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        ctx.fillStyle = "white";
        ctx.font = "75px Changa one";
        ctx.fillText(gameOver,125,350);
        clearInterval(game);
        dead.play();
    }
        


    console.log(score);
 }
// call draw function every 150ms

let game = setInterval(draw,(speed/(score+1)));

// create function to increase speed

function changeSpeed(score){
    if (score == 1){
        clearInterval(game);
        game = setInterval(draw,(speed/(score+0.5)));
        console.log("AAAAAAAAAAAAAAAAaa")

    }
    if (score == 2){
        clearInterval(game);
        game = setInterval(draw,(speed/(score+0.5)));
}   
    if (score == 3){
        clearInterval(game);
        game = setInterval(draw,(speed/(score+0.5)));
}
    }


