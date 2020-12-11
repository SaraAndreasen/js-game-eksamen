//Hover med VUE.JS på game-description.php og form-check på login
new Vue({
    el: "#app",
    data: {
        active: false,
        username: '',
        password: '',
        name: '',
        validation: null,

    },
    });



let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d');

// Billeder
let avatar = new Image();
avatar.src = "images/avatar.png";
let enemyImage = new Image();
enemyImage.src = "images/enemy.png";
let coinImage = new Image();
coinImage.src = "images/coin.png";
let finish = new Image();
finish.src = "images/elevator.png";
let decoyImage = new Image();
decoyImage.src = "images/decoy.png";
let bossImage = new Image();
bossImage.src = "images/boss.png";
let enemy1Image = new Image();
enemy1Image.src = "images/enemy.png";

//Level et
let maze = 
[
    [0, 0, 0, 0, 0, 0, 0, 1, 3, 0],
    [0, 5, 1, 1, 1, 4, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 4],
    [4, 1, 0, 1, 1, 1, 1, 4, 0, 1],
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 0, 4, 0, 1, 0, 4, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
]

//Level to
function mazeTwo() {
    maze =
        [
            [0, 0, 0, 1, 1, 4, 1, 1, 0, 0],
            [0, 4, 1, 1, 0, 0, 0, 1, 0, 0],
            [0, 8, 0, 0, 0, 0, 0, 1, 0, 4],
            [0, 1, 1, 1, 1, 1, 1, 4, 0, 1],
            [0, 1, 0, 1, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 1, 1, 3, 0, 1, 1, 0],
            [1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
            [1, 0, 0, 4, 0, 5, 0, 1, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 1, 6, 0],
            [2, 1, 1, 1, 1, 1, 4, 1, 1, 0],
        ]
}


//Level tre
function mazeThree(){
    maze =
        [
            [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
            [4, 1, 1, 1, 1, 1, 1, 4, 8, 0],
            [0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 4, 2, 5, 0, 4, 1, 3],
            [1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
            [1, 0, 0, 0, 0, 1, 0, 0, 1, 0],
            [1, 0, 1, 1, 7, 1, 1, 1, 1, 0],
            [4, 1, 1, 0, 4, 0, 6, 0, 0, 0],
        ]
}


//Variabler
let tileSize = 50;
let playerPosition = {x:0, y:0};
let enemyPosition = {x:0, y:0};
let enemyPosition1 = { x: 0, y: 0 };  
let bossPosition = { x: 0, y: 0 };
let wall = 0;
let road = 1;
let player = 2;
let goal = 3;
let coin = 4;
let enemy = 5;
let decoy = 6;
let boss = 7;
let enemy1 = 8;

//Intervaller
setInterval(() => {
    enemyWalk();
}, 1100)

setInterval(() => {
    enemyWalk1();
}, 1000)


setInterval(() => {
    bossWalk();
}, 1000)

countdown();

//Tegn avatar
ctx.drawImage(avatar, 9 * tileSize, 9 * tileSize, tileSize, tileSize);

//Tegn labyrinten
function drawMaze(){
    for(let y=0; y < maze.length; y++){
        for(let x = 0; x < maze[y].length; x++){
            //Wall
            if(maze[y][x]===wall){
                ctx.fillStyle = "black";
                ctx.fillRect(x*tileSize,y*tileSize,tileSize,tileSize);
            // road
            }else if (maze[y][x] === road) {
                ctx.fillStyle = "grey";
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            //player
            } else if (maze[y][x] === player) {
                playerPosition.x = x;
                playerPosition.y = y;
                ctx.drawImage(avatar, x * tileSize, y * tileSize, tileSize, tileSize)
             } //goal
            else if (maze[y][x] === goal) {
                ctx.drawImage(finish, x * tileSize, y * tileSize, tileSize, tileSize)
            }   //Collectible
            else if (maze[y][x] === coin){
                ctx.drawImage(coinImage, x * tileSize, y * tileSize, tileSize, tileSize)
            }//Enemy
            else if (maze[y][x] === enemy){
                ctx.drawImage(enemyImage, x * tileSize, y * tileSize, tileSize, tileSize)
                enemyPosition.x = x;
                enemyPosition.y = y;
            }//Decoy coin
            else if (maze[y][x] === decoy) {
                ctx.drawImage(decoyImage, x * tileSize, y * tileSize, tileSize, tileSize)
            }//Boss
            else if (maze[y][x] === boss) {
                ctx.drawImage(bossImage, x * tileSize, y * tileSize, tileSize, tileSize)
                bossPosition.x = x;
                bossPosition.y = y;
            }
            //Enemy1
            else if (maze[y][x] === enemy1) {
                ctx.drawImage(enemy1Image, x * tileSize, y * tileSize, tileSize, tileSize)
                enemyPosition1.x = x;
                enemyPosition1.y = y;
            }

}
}
}



//Lyd
let vol = 0.15;
function walk(){
let gameSound = new Audio('gamesounds/walk.mp3');
    gameSound.volume = (vol);
    gameSound.play();

}

function collect(){
    let gameSound = new Audio('gamesounds/gather.mp3');
    gameSound.volume = (vol);
    gameSound.play();

}

function attacked(){
    let gameSound = new Audio('gamesounds/hit.mp3');
    gameSound.volume = (vol);
    gameSound.play();

}

function inGoal(){
    let gameSound = new Audio('gamesounds/goal.mp3');
    gameSound.volume = (vol);
    gameSound.play();

}

//Spiller movement
window.addEventListener("keydown", (e)=>{
    switch(e.keyCode){
        case 37: //Left

            if (maze[playerPosition.y][playerPosition.x - 1] === road)
            { maze[playerPosition.y][playerPosition.x - 1] = player //Players nye position
                maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
                drawMaze();
                walk();
            } 
            //Mønt-tiles
            else if (maze[playerPosition.y][playerPosition.x - 1] === coin) //Mønt tiles 
            {
                maze[playerPosition.y][playerPosition.x - 1] = player //Players nye position
                maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
                drawMaze();
                coinNumber();
                collect();
            }
            //Goal-tile
            else if (maze[playerPosition.y][playerPosition.x - 1] === goal) {
                maze[playerPosition.y][playerPosition.x - 1] = player //Players nye position
                maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
                drawMaze();
                inGoal();
                GameWin();
              
            }
        
            //Fjende-tile
            else if (maze[playerPosition.y][playerPosition.x - 1] === enemy){
                maze[playerPosition.y][playerPosition.x - 1] = player //Players nye position
                maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
                drawMaze();
                attacked();
                GameOver();

            }
            //Decoy-tile
            else if (maze[playerPosition.y][playerPosition.x - 1] === decoy) {
                maze[playerPosition.y][playerPosition.x - 1] = player //Players nye position
                maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
                drawMaze();
                attacked();
                GameOver();
            }
            //boss-tile
            else if (maze[playerPosition.y][playerPosition.x - 1] === boss) {
                maze[playerPosition.y][playerPosition.x - 1] = player //Players nye position
                maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
                drawMaze();
                attacked();
                GameOver();
            }
            //Fjende1-tile
            else if (maze[playerPosition.y][playerPosition.x - 1] === enemy1) {
                maze[playerPosition.y][playerPosition.x - 1] = player //Players nye position
                maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
                drawMaze();
                attacked();
                GameOver();

            }
            break;

        case 38: //Up
        if (maze[playerPosition.y - 1][playerPosition.x] === road){
            maze[playerPosition.y - 1][playerPosition.x] = player
            maze[playerPosition.y][playerPosition.x] = road
            drawMaze();
            walk();
        } 
        //Mønt-tiles
        else if (maze[playerPosition.y - 1][playerPosition.x] === coin) {
            maze[playerPosition.y - 1][playerPosition.x] = player
            maze[playerPosition.y][playerPosition.x] = road
            drawMaze();
            coinNumber();
            collect();
        }
        //Mål-tile
        else if (maze[playerPosition.y -1][playerPosition.x] === goal) {
                maze[playerPosition.y - 1][playerPosition.x] = player //Players nye position
                maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
                drawMaze();
                inGoal();
                GameWin();
            }
        
        //Fjende-tile
        else if (maze[playerPosition.y - 1][playerPosition.x] === enemy) {
            maze[playerPosition.y - 1][playerPosition.x] = player //Players nye position
            maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
            drawMaze();
            attacked();
            GameOver();
        }
        //Decoy-tile
        else if (maze[playerPosition.y - 1][playerPosition.x] === decoy) {
            maze[playerPosition.y - 1][playerPosition.x] = player //Players nye position
            maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
            drawMaze();
            attacked();
            GameOver();
        }
        //boss-tile
        else if (maze[playerPosition.y - 1][playerPosition.x] === boss) {
            maze[playerPosition.y - 1][playerPosition.x] = player //Players nye position
            maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
            drawMaze();
            attacked();
            GameOver();
        }
        //Fjende1-tile
        else if (maze[playerPosition.y - 1][playerPosition.x] === enemy1) {
            maze[playerPosition.y - 1][playerPosition.x] = player //Players nye position
            maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
            drawMaze();
            attacked();
            GameOver();

        }
        break;
        
        case 39: //Right
        if(maze[playerPosition.y][playerPosition.x + 1] === road){
            maze[playerPosition.y][playerPosition.x +  1] = player
            maze[playerPosition.y][playerPosition.x] = road
            drawMaze();
            walk();
        } 
        //Mønt-tiles
        else if (maze[playerPosition.y][playerPosition.x + 1] === coin) {
            maze[playerPosition.y][playerPosition.x + 1] = player
            maze[playerPosition.y][playerPosition.x] = road
            drawMaze();
            coinNumber();
            collect();
        }
        //Mål-tile

         else if (goalLock()){
             if (maze[playerPosition.y][playerPosition.x + 1] === goal){
                maze[playerPosition.y][playerPosition.x + 1] = player //Players nye position
                maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
                inGoal();
                GameWin();
                levelTjek();
                if (levelcheck == 2){
                    mazeTwo();
                } else if (levelcheck == 3){
                    mazeThree();
                }
                 drawMaze();
            
                /*setTimeout(function(){
                    if(levelcheck == 1){
                        maze = mazeTwo;
                    } else if (levelcheck == 2){
                        mazeTwo = mazeThree;
                    }
                }, 1000); */
            }
        }
        
        //Fjende-tile
        else if (maze[playerPosition.y][playerPosition.x + 1] === enemy) {
            maze[playerPosition.y][playerPosition.x + 1] = player //Players nye position
            maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
            drawMaze();
            attacked();
            GameOver();
        }
        //Decoy-tile
        else if (maze[playerPosition.y][playerPosition.x + 1] === decoy) {
            maze[playerPosition.y][playerPosition.x + 1] = player //Players nye position
            maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
            drawMaze();
            attacked();
            GameOver();
        }
        //boss-tile
        else if (maze[playerPosition.y][playerPosition.x + 1] === boss) {
            maze[playerPosition.y][playerPosition.x + 1] = player //Players nye position
            maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
            drawMaze();
            attacked();
            GameOver();
        }
        //Fjende1-tile
        else if (maze[playerPosition.y][playerPosition.x + 1] === enemy1) {
            maze[playerPosition.y][playerPosition.x + 1] = player //Players nye position
            maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
            drawMaze();
            attacked();
            GameOver();

        }
        break;

        case 40: //Down
        if(maze[playerPosition.y + 1][playerPosition.x] === road){
            maze[playerPosition.y + 1][playerPosition.x] = player
            maze[playerPosition.y][playerPosition.x] = road
            drawMaze();
            walk();
        } 
        //mønt-tiles
        else if (maze[playerPosition.y + 1][playerPosition.x] === coin) {
            maze[playerPosition.y + 1][playerPosition.x] = player
            maze[playerPosition.y][playerPosition.x] = road
            drawMaze();
            coinNumber();
            collect();
        }
        
        //Goal-tile
        else if(maze[playerPosition.y + 1][playerPosition.x] === goal) {
            maze[playerPosition.y + 1][playerPosition.x] = player
            maze[playerPosition.y][playerPosition.x] = road
            drawMaze();
            inGoal();
            GameWin();
        }
        //Fjende-tile
            else if (maze[playerPosition.y + 1][playerPosition.x] === enemy){
                maze[playerPosition.y + 1][playerPosition.x] = player //Players nye position
                maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
                drawMaze();
                attacked();
                GameOver();
            }
            //Decoy-tile
        else if (maze[playerPosition.y + 1][playerPosition.x] === decoy) {
            maze[playerPosition.y + 1][playerPosition.x] = player //Players nye position
            maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
            drawMaze();
            attacked();
            GameOver();
        }
        //boss-tile
        else if (maze[playerPosition.y + 1][playerPosition.x] === boss) {
            maze[playerPosition.y + 1][playerPosition.x] = player //Players nye position
            maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
            drawMaze();
            attacked();
            GameOver();
        }
        //Fjende1-tile
        else if (maze[playerPosition.y + 1][playerPosition.x] === enemy1) {
            maze[playerPosition.y + 1][playerPosition.x] = player //Players nye position
            maze[playerPosition.y][playerPosition.x] = road //Players gamle position 
            drawMaze();
            attacked();
            GameOver();

        }
        break;
    }
})

//Level Check
let levelcheck = 1;

function levelTjek(){
    levelcheck++;
    console.log(levelcheck);
}


//Gameover
function GameOver(){
    let txt;
    if (confirm("You hit an enemy. You lost!")){
        location.reload();
        txt = "Try again!";
    } else{
        location.reload();
        txt = "Try again!";
    }
    document.querySelector("#timer").innerHTML = txt;
}

//Game win
function GameWin(){
  alert("You won! Entering next level.")
}


//Timer
let mins = 4;
let secs = mins * 60;
function countdown() {
    setTimeout('Decrement()', 60);
}

function Decrement() {
    minutes = document.querySelector("#minutes");
    seconds = document.querySelector("#seconds");
        if (seconds < 59) {
            seconds.value = secs;
        }
        else {
            minutes.value = getMinutes();
            seconds.value = getSeconds();
        }

        if (mins < 0.10) {
            minutes.style.color = "red";
            seconds.style.color = "red";
            document.querySelector("#timerMessage").innerHTML = "HURRY UP!!";
        }

        if (mins < 0) { 
            alert('Game over! Try again.');
            location.reload()
            minutes.value = 0;
            seconds.value = 0;
            document.querySelector("#timerMessage").innerHTML = "Time's up.";

        }
        else {
            secs--;
            setTimeout('Decrement()', 1000);
        }
    }

function getMinutes() {
    mins = Math.floor(secs / 60);
    return mins;
}

function getSeconds() {
    return secs - Math.round(mins * 60);
} 


//Mønt-tæller
let coinCount = document.querySelector("#coinAmount");
let moreCoins = document.querySelector("#moreCoins");
let goldCoin = 0;
let goldTotal = 6;

function coinNumber(){
    goldCoin += 1;
    coinCount.innerHTML = "You collected " + goldCoin + " out of " + goldTotal + " coins.";
}

//Mål-lås
function goalLock() {
    if (goldCoin == 6){
        
        return true; 
    }else if (goldCoin == 12){
        return true; 
    }else if (goldCoin == 18) {
        return true;
    }
    else {
        moreCoins.innerHTML = "You haven't picked up all the coins yet!";
        return false;
    }
}

//Fjende
function enemyWalk(){
    let rand = Math.floor(Math.random() *2) + 1;

    if(rand == 2){//down
        if (maze[enemyPosition.y - 1][enemyPosition.x] === road){
            maze[enemyPosition.y - 1][enemyPosition.x] = enemy
            maze[enemyPosition.y][enemyPosition.x] = road
        } 
    } else if (rand == 1){ //up
            if(maze[enemyPosition.y + 1][enemyPosition.x] === road){
                maze[enemyPosition.y + 1][enemyPosition.x] = enemy
                maze[enemyPosition.y][enemyPosition.x] = road
            }
        }

                drawMaze();
}

function enemyWalk1() {
    let rand = Math.floor(Math.random() * 2) + 1;
    if (levelcheck == 2 || levelcheck == 3){
        if (rand == 2) {//down
            if (maze[enemyPosition1.y - 1][enemyPosition1.x] === road) {
                maze[enemyPosition1.y - 1][enemyPosition1.x] = enemy1
                maze[enemyPosition1.y][enemyPosition1.x] = road
            }
        } else if (rand == 1) { //up
            if (maze[enemyPosition1.y + 1][enemyPosition1.x] === road) {
                maze[enemyPosition1.y + 1][enemyPosition1.x] = enemy1
                maze[enemyPosition1.y][enemyPosition1.x] = road
            }
        }
    }

    drawMaze();
}



//Boss

function bossWalk() {
    let rand = Math.floor(Math.random() * 2) + 1;

    if (rand == 2) {//right
        if (maze[bossPosition.y][bossPosition.x + 1] === road) {
            maze[bossPosition.y][bossPosition.x + 1] = boss
            maze[bossPosition.y][bossPosition.x] = road
        }
    } else if (rand == 1) { //up
        if (maze[bossPosition.y][bossPosition.x - 1] === road) {
            maze[bossPosition.y][bossPosition.x - 1] = boss
            maze[bossPosition.y][bossPosition.x] = road
        }
    }

    drawMaze();
}

window.addEventListener("load", drawMaze);