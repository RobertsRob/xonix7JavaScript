// this is a xonix game //

// variables -----
var ctx = myCanvas.getContext("2d");

const gameBegining = "gameBegining";
const gemeGo = "gemeGo";
const gameLose = "gameLose";

let gameStatus = gameBegining;

const gameSpeed = 50;


let movement = "stop";
let keyA = false;
let keyS = false;
let keyD = false;
let keyW = false;

let keySpace = false;
let posPlOneB = {x: 0, y: 0};

const pixelSize = 10;

const numEnemies = 200;
let enemies = [];

let filled = 1;


//for cikles
let countSnake = 0;


// coordinate array creation -----
let widthL = myCanvas.width / pixelSize; 
let heightL = myCanvas.height / pixelSize; 

let arrayC = [];

for (let i = 0; i < heightL; i++)
{
    arrayC.push(Array(widthL).fill(0));
}
// end -----

let player = new MovingObject(myCanvas.width/2, 0, 10, 10, "white");

for (let i = 0; i < numEnemies; i++)
{
    let xE = Math.round(Math.floor(Math.random() * ((myCanvas.height - 100) - 100 + 1) ) + 100);
    let yE = Math.round(Math.floor(Math.random() * ((myCanvas.height - 100) - 100 + 1) ) + 100);
    enemies.push(new MovingObject(xE, yE, 10, 10, "red"));
    enemies[i].setSpeed(-10, -10);
}

// end -----

// start function -----
start();

function start()
{
    setInterval(update, gameSpeed);
    addEventListener( "keydown", keyDown );
    addEventListener( "keyup", keyUp );
    addBordersMap();
}
// end -----

// keybord enter -----
function keyDown(key)
{
    // console.log(key.keyCode);
    if(key.keyCode == 87)
    {
        keyW = true; //w
    }
    if(key.keyCode == 83)
    {
        keyS = true; //s
    }
    if(key.keyCode == 68)
    {
        keyD = true; //d
    }
    if(key.keyCode == 65)
    {
        keyA = true; //a
    }
    if(key.keyCode == 32)
    {
        keySpace = true;
        gameStatus = gemeGo;
    }
}

function keyUp(key)
{
    if(key.keyCode == 87)
    {
        keyW = false; //w
    }
    if(key.keyCode == 83)
    {
        keyS = false; //s
    }
    if(key.keyCode == 68)
    {
        keyD = false; //d
    }
    if(key.keyCode == 65)
    {
        keyA = false; //a
    }
    if(key.keyCode == 32)
    {
        keySpace = false;
    }
}
// end -----


// add border map function -----
function addBordersMap()
{
    for (let y = 0; y < arrayC.length; y++)
    {
        for (let x = 0; x < arrayC[y].length; x++){
            
            if(x == 1 || x == 0 || x == arrayC[y].length - 1 || x == arrayC[y].length - 2 || y == 0 || y == 1 || y == arrayC.length - 1 || y == arrayC.length - 2)
            {
                arrayC[y][x] = 3;
            }
        }
    }
}
// end -----

// update function -----

function update()
{
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    console.log();

    var speedPl = player.getSpeed();
    var posPl = player.getPos();
    var sizePl = player.getSize();


    // enemy colision -----
    for (let i = 0; i < numEnemies; i++)
    {
        // var speedLE = enemies[i].getSpeed();
        // let LatePosEnemy = enemies[i].getPos();
        // enemies[i].update();
        // let posEnemy = enemies[i].getPos();

        // if(arrayC[Math.round(posEnemy.y/pixelSize)+1][Math.round(posEnemy.x/pixelSize+1)] == 3)
        // {
        //     enemies[i].setSpeed(-speedLE.vx, -speedLE.vy);
        // }else if(arrayC[Math.round(posEnemy.y/pixelSize+1)][Math.round(posEnemy.x/pixelSize+1)] == 3)
        // {
        //     enemies[i].setSpeed(speedLE.vx, -speedLE.vy);
        // }else if(arrayC[Math.round(posEnemy.y/pixelSize+1)][Math.round(posEnemy.x/pixelSize-1)] == 3)
        // {
        //     enemies[i].setSpeed(-speedLE.vx, speedLE.vy);
        // }else if(arrayC[Math.round(posEnemy.y/pixelSize-1)][Math.round(posEnemy.x/pixelSize-1)] == 3)
        // {
        //     enemies[i].setSpeed(speedLE.vx, -speedLE.vy);
        // }
        

        // arrayC[Math.round(posEnemy.y/pixelSize)][Math.round(posEnemy.x/pixelSize)] = 4;
        // if(arrayC[Math.round(LatePosEnemy.y/pixelSize)][Math.round(LatePosEnemy.x/pixelSize)] != 3)
        // {
        //     arrayC[Math.round(LatePosEnemy.y/pixelSize)][Math.round(LatePosEnemy.x/pixelSize)] = 0;
        // }





        let speedLE = enemies[i].getSpeed();
        let LatePosEnemy = enemies[i].getPos();
        enemies[i].update();
        let posEnemy = enemies[i].getPos();

        let nextX = Math.round(posEnemy.x / pixelSize);
        let nextY = Math.round(posEnemy.y / pixelSize);

        if (arrayC[nextY - 1][nextX] == 3 && arrayC[nextY][nextX - 1] == 3 || arrayC[nextY + 1][nextX] == 3 && arrayC[nextY][nextX - 1] == 3 || arrayC[nextY + 1][nextX] == 3 && arrayC[nextY][nextX + 1] == 3 || arrayC[nextY - 1][nextX] == 3 && arrayC[nextY][nextX + 1] == 3) {
            // Collision with corners, change y and x speed
            enemies[i].setSpeed(-speedLE.vx, -speedLE.vy);
        }else if (arrayC[nextY + 1][nextX] == 3 || arrayC[nextY - 1][nextX] == 3) {
            // Collision with upper or bottom wall, change only y speed
            enemies[i].setSpeed(speedLE.vx, -speedLE.vy);
        } else if (arrayC[nextY][nextX + 1] == 3 || arrayC[nextY][nextX - 1] == 3) {
            // Collision with right or left wall, change only x speed
            enemies[i].setSpeed(-speedLE.vx, speedLE.vy);
        } else if (arrayC[nextY + 1][nextX + 1] == 3) {
            enemies[i].setSpeed(-speedLE.vx, -speedLE.vy);
        } else if (arrayC[nextY + 1][nextX - 1] == 3) {
            enemies[i].setSpeed(-speedLE.vx, speedLE.vy);
        } else if (arrayC[nextY - 1][nextX + 1] == 3) {
            enemies[i].setSpeed(speedLE.vx, -speedLE.vy);
        } else if (arrayC[nextY - 1][nextX - 1] == 3) {
            enemies[i].setSpeed(speedLE.vx, speedLE.vy);
        }
        if(arrayC[nextY][nextX] != 3)
        {
            arrayC[nextY][nextX] = 4;
            
        }
        else
        {
            // alert("Error colision!");
            enemies[i].setSpeed(-speedLE.vx, -speedLE.vy);
            if(arrayC[Math.round(LatePosEnemy.y / pixelSize)][Math.round(LatePosEnemy.x / pixelSize)] != 3)
            {
                enemies[i].setPos(LatePosEnemy.x, LatePosEnemy.y);
                // alert("Error fixed!");
            }
            else
            {
                alert("Error colision is failed!");
            }

        }

        if (arrayC[Math.round(LatePosEnemy.y / pixelSize)][Math.round(LatePosEnemy.x / pixelSize)] != 3) {
            arrayC[Math.round(LatePosEnemy.y / pixelSize)][Math.round(LatePosEnemy.x / pixelSize)] = 0;
        }
    }
    //end -----
    
    // movement variable change
    if (keyA == true) {
        movement = "left";
        
    } else if (keyS == true) {
        movement = "down";
    } else if (keyD == true) {
        movement = "right";
    } else if (keyW == true) {
        movement = "up";
    } else if (keySpace == true){
        movement = "stop";
    }

    switch (movement)
    {
        case "left":
            if(posPl.x - pixelSize >= 0){
                player.setSpeed(-pixelSize, 0);
            }
            else{
                player.setSpeed(0, 0);
            }
        break;
        case "down":
            if(posPl.y + 2*pixelSize <= myCanvas.height){
                player.setSpeed(0, pixelSize);
            }
            else{
                player.setSpeed(0, 0);
            }
        break;
        case "right":
            if(posPl.x + 2*pixelSize <= myCanvas.width){
                player.setSpeed(pixelSize, 0);
            }
            else{
                player.setSpeed(0, 0);
            }
        break;
        case "up":
            if(posPl.y - pixelSize >= 0){
                player.setSpeed(0, -pixelSize);
            }
            else{
                player.setSpeed(0, 0);
            }
        break;
        case "stop":
            player.setSpeed(0, 0);
        break;
    }

    


    for (let y = 0; y < arrayC.length; y++)
    {
        for (let x = 0; x < arrayC[y].length; x++) {
            // console.log(arrayC[y][x]);

            // 0 => nothing
            // 1 => player
            // 2 => snake
            // 3 => fill
            // 4 => nothing enemy
            // 5 => fill enemy
            // 6 => filling thing

            if(arrayC[y][x] == 0)
            {
                ctx.fillStyle = "black";
                ctx.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
            }
            if(arrayC[y][x] == 1)
            {
                ctx.fillStyle = "white";
                ctx.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
            }
            if(arrayC[y][x] == 2)
            {
                countSnake++;
                ctx.fillStyle = "green";
                ctx.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);

                //checking colisions
                // console.log(posPl.x +"v"+ posPl.y  +"v"+ x  +"v"+ y);
                if(posPl.x/pixelSize == x && posPl.y/pixelSize == y)
                {
                    // alert("DIE!");
                }
            }
            if(arrayC[y][x] == 3)
            {
                ctx.fillStyle = "blue";
                ctx.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
                
                // console.log(posPl.x/pixelSize == x && posPl.y/pixelSize == y && countSnake != 0);
                if(posPl.x/pixelSize == x && posPl.y/pixelSize == y && countSnake != 0)
                {
                    //fill
                    // alert("fill");
                    for (let i = 0; i < numEnemies; i++)
                    {
                        let posEnemy = enemies[i].getPos();
                        arrayC[Math.round(posEnemy.y/pixelSize)][Math.round(posEnemy.x/pixelSize)] = 6;
                    }
                    while(filled != 0)
                    {
                        // alert(filled);
                        fillRec();
                        
                    }

                    replacerFill();
                    for (let i = 0; i < numEnemies; i++)
                    {
                        let posEnemy = enemies[i].getPos();
                        arrayC[Math.round(posEnemy.y/pixelSize)][Math.round(posEnemy.x/pixelSize)] = 4;
                    }
                }
            }
            if(arrayC[y][x] == 4)
            {
                // alert(1);
                ctx.fillStyle = "red";
                ctx.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
            }



            
            
        }
        
    }
    
    posPlOneB.x = posPl.x;
    posPlOneB.y = posPl.y;

    player.draw();
    player.update();

    var pposPl = player.getPos();

    arrayC[posPl.y/pixelSize][posPl.x/pixelSize] = 1;

    if(pposPl.y != posPlOneB.y || posPlOneB.x != pposPl.x)
    {
        arrayC[posPlOneB.y/pixelSize][posPlOneB.x/pixelSize] = 2;
    }
    

    
    




    addBordersMap();
}

// end -----


// function fill recursion -----
function fillRec()
{
    
    filled = 0;
    for (let t = 0; t < arrayC.length; t++) {
        for (let c = 0; c < arrayC[t].length; c++) {
            if (arrayC[t][c] == 6) {
                if (arrayC[t + 1][c] === 0 && arrayC[t + 1][c] != 4) {
                    arrayC[t + 1][c] = 6;
                    filled++;
                }
                if (arrayC[t - 1][c] === 0 && arrayC[t - 1][c] != 4) {
                    arrayC[t - 1][c] = 6;
                    filled++;
                }
                if (arrayC[t][c + 1] === 0 && arrayC[t][c + 1] != 4) {
                    arrayC[t][c + 1] = 6;
                    filled++;
                }
                if (arrayC[t][c - 1] === 0 && arrayC[t][c - 1] != 4) {
                    arrayC[t][c - 1] = 6;
                    filled++;
                }
            }
        }
    }
}

function replacerFill()
{
    for (let y = 0; y < arrayC.length; y++)
    {
        for (let x = 0; x < arrayC[y].length; x++) {
            if(arrayC[y][x] == 0)
            {
                arrayC[y][x] = 3;
            }
            if(arrayC[y][x] == 2)
            {
                arrayC[y][x] = 3;
            }
        }
    }


    for (let y = 0; y < arrayC.length; y++)
    {
        for (let x = 0; x < arrayC[y].length; x++) {
            if(arrayC[y][x] == 6)
            {
                arrayC[y][x] = 0;
            }
        }
    }

    filled = 1;

}

// end -----
