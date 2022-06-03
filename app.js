const grid = document.querySelector(".grid");
let resultDisplay = document.querySelector(".result");
let width = 15;
let currentSpaceshipIndex = 202;
let direction = 1;
let invadersId;
let goingRight = true;
let invadersRemoved = [];
let result = 0;


for(i = 0; i < 225; i++){
    const square = document.createElement('div');
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'));

const invaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw() {
    for(let i = 0; i < invaders.length; i++){
        if(!invadersRemoved.includes(i)){
            squares[invaders[i]].classList.add('invaders');
        }
    }
}
draw();

function remove() {
    for(let i = 0; i < invaders.length; i++){
        squares[invaders[i]].classList.remove('invaders');
    }
}

squares[currentSpaceshipIndex].classList.add('spaceship');

function moveSpaceship(e){
    squares[currentSpaceshipIndex].classList.remove('spaceship');
    switch(e.key) {
        case 'ArrowLeft':
            if (currentSpaceshipIndex % width !==0) currentSpaceshipIndex -=1
            break
        case 'ArrowRight':
            if(currentSpaceshipIndex % width < width -1) currentSpaceshipIndex += 1
            break
    }
    squares[currentSpaceshipIndex].classList.add('spaceship');
}
document.addEventListener('keydown', moveSpaceship)

function moveInvaders(){
    const leftEdge = invaders[0] % width === 0;
    const rightEdge = invaders[invaders.length -1] % width === width -1;
    remove();

    if(rightEdge && goingRight){
        for (let i = 0; i < invaders.length; i++){
            invaders[i] += width -1;
            direction = -1;
            goingRight = false;
        }
    }

    if(leftEdge && !goingRight){
        for(let i = 0; i < invaders.length; i++){
            invaders[i] += width -1;
            direction = 1;
            goingRight = true;
        }
    }

    for (let i = 0; i < invaders.length; i++){
        invaders[i] += direction
    }

    draw();

    if(squares[currentSpaceshipIndex].classList.contains('invaders', 'spaceship')){
        resultDisplay.textContent = "GAME OVER";
        console.log("over");
        clearInterval(invadersId);
    }

    for (let i = 0; i< invaders.length; i++){
        if(invaders[i] > squares.length){
            resultDisplay.textContent = "GAME OVER";
            clearInterval(invadersId);
        }
    }

    if(invadersRemoved.length === invaders.length){
        resultDisplay.textContent = "YOU WIN";
        clearInterval(invadersId);
    }
}

invadersId = setInterval(moveInvaders, 300);

function shoot(e){
    let laserId;
    let currentLaserIndex = currentSpaceshipIndex;

    function moveLaser(){
        squares[currentLaserIndex].classList.remove('laser');
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add('laser');

        if (squares[currentLaserIndex].classList.contains('invaders')){
            squares[currentLaserIndex].classList.remove('laser');
            squares[currentLaserIndex].classList.remove('invaders');
            squares[currentLaserIndex].classList.add('boom');

            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250);
            clearInterval(laserId);

            const invadersRemove = invaders.indexOf(currentLaserIndex);
            invadersRemoved.push(invadersRemove)
            result += 100;
            resultDisplay.textContent = result;
        }
    }

    switch(e.key){
        case " ":
            laserId = setInterval(moveLaser, 100);
    }
}

document.addEventListener('keydown', shoot);