const mario = document.querySelector('.mario');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

let score = 0;
let isGameOver = false;
let loop;
let pipe;

const jump = () => {
    if (!isGameOver) {
        if (!mario.classList.contains('jump')) {
            mario.classList.add('jump');
            setTimeout(() => {
                mario.classList.remove('jump');
            }, 500);
        }
    }
};

const createPipe = () => {
    pipe = document.createElement('img');
    pipe.src = 'src/images/pipe.png';
    pipe.classList.add('pipe');
    document.querySelector('.game-board').appendChild(pipe);
    pipe.style.animation = 'pipe-animation 2s linear infinite';
};

const startGame = () => {
    score = 0;
    isGameOver = false;
    scoreElement.innerText = 'Pontuação: 0';
    restartButton.style.display = 'none';

    const newPipeInterval = setInterval(() => {
        if (!isGameOver) {
            createPipe();
        } else {
            clearInterval(newPipeInterval);
        }
    }, 2000);

    loop = setInterval(() => {
        const pipePosition = document.querySelector('.pipe') ? pipe.offsetLeft : 0;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && marioPosition < 80 && pipePosition > 0) {
            mario.src = "src/images/game-over.png";
            pipe.style.left = `${pipePosition}px`
            mario.style.left = `${marioPosition}px`
            mario.style.width = "75px";
            mario.style.marginLeft = "50px";
            clearInterval(loop);
            isGameOver = true;
            restartButton.style.display = 'block';
        } else if (!isGameOver) {
            score++;
            scoreElement.innerText = `Pontuação: ${score}`;
        }
    }, 100);
};

const restartGame = () => {
    document.querySelectorAll('.pipe').forEach(pipe => pipe.remove());
    mario.src = "src/images/mario.gif";
    mario.style.width = "150px";
    mario.style.marginLeft = "0";
    scoreElement.innerText = 'Pontuação: 0';
    isGameOver = false;
    startGame();
};

document.addEventListener("keydown", jump);
restartButton.addEventListener("click", restartGame);
startGame();