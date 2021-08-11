const inputDir = { x: 0, y: 0 };
const foodsound = new Audio('../music/food.mp3');
const gameoversound = new Audio('../music/gameover.mp3');
const movesound = new Audio('../music/move.mp3');
const musicsound = new Audio('../music/music.mp3');
let speed = 6;
let score = 0;
let lastpaintime = 0;
let snakearr = [{
    x: 13, y: 15
}];
let food = { x: 12, y: 14 }


//game function
function main(ctime) {
    //console.log(ctime);
    window.requestAnimationFrame(main);
    if ((ctime - lastpaintime) / 1000 < 1 / speed) {
        return;
    }
    lastpaintime = ctime;
    gameengine();
}

function iscollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

function gameengine() {

    //update the snake array
    if (iscollide(snakearr)) {
        gameoversound.play();
        musicsound.pause();
        alert("Game Over. Press any key to play again!");
        // inputDir =  {x: 0, y: 0}; 
        snakearr = [{
            x: 9, y: 9
        }];
        musicsound.play();
        score = 0;
    }

    //if food is eaten regenarate the food and  increment the score
    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        foodsound.play();
        score += 1;
        scorebox.innerHTML = "SCORE: " + score;
        snakearr.unshift({ x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }


    // Moving the snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }

    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;

    //display the snake & food array
    //displaying snake
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //display food 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}







//main game logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    // inputDir = {x: 0, y: 1} 
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "s":
            console.log("s");
            // inputDir.x = 0;
            // inputDir.y = 0;
            musicsound.pause();
            break;
        case "p":
            console.log("p");
            // inputDir.x = 0;
            // inputDir.y = 0;
            musicsound.play();
            break;
        case "f":
            console.log("f");
            speed+=2;
            spd.innerHTML = "SPEED: " +speed;
            rpeed
        case "l":
                console.log("l");
                if(speed>4){
                speed-=2;
                spd.innerHTML = "SPEED: " +speed;
                }else{
                    speed=2;
                    spd.innerHTML = "SPEED: " +speed;
                }
                break;    
        default:
            break;
    }

});