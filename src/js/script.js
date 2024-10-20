const mario = document.querySelector('.mario');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

let score = 0;
let isGameOver = false;
let loop;
let pipeSpeed = 2;

const translations = {
    en: {
        score: 'Score: ',
        restart: 'Restart Game'
    },
    pt: {
        score: 'Pontuação: ',
        restart: 'Reiniciar Jogo'
    }
};

const storedLanguage = localStorage.getItem('language') || 'en';

// Função de salto do Mario
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

// Criar um tubo
const createPipe = () => {
    const pipe = document.createElement('img');
    pipe.src = 'src/images/pipe.png';
    pipe.classList.add('pipe');
    document.querySelector('.game-board').appendChild(pipe);

    pipe.style.animation = `pipe-animation ${pipeSpeed}s linear forwards`;

    pipe.addEventListener('animationend', () => {
        pipe.remove();
    });
};

// Aumentar a velocidade do tubo
const increasePipeSpeed = () => {
    if (pipeSpeed > 0.8) {
        pipeSpeed -= 0.05; 
    }
};

// Iniciar o jogo
const startGame = () => {
    score = 0;
    pipeSpeed = 2;
    isGameOver = false;
    scoreElement.innerText = `${translations[storedLanguage].score}0`;
    restartButton.style.display = 'none';

    const newPipeInterval = setInterval(() => {
        if (!isGameOver) {
            createPipe();
            increasePipeSpeed();
        } else {
            clearInterval(newPipeInterval);
        }
    }, 2000);

    loop = setInterval(() => {
        const pipe = document.querySelector('.pipe');
        const pipePosition = pipe ? pipe.offsetLeft : 0;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        // Verificar colisão
        if (pipePosition <= 120 && marioPosition < 80 && pipePosition > 0) {
            mario.src = "src/images/game-over.png";
            mario.style.width = "75px";
            mario.style.marginLeft = "50px";
            clearInterval(loop);
            isGameOver = true;
            restartButton.style.display = 'block';
        } else if (!isGameOver) {
            score++;
            scoreElement.innerText = `${translations[storedLanguage].score}${score}`;
        }
    }, 100);
};

// Reiniciar o jogo
const restartGame = () => {
    document.querySelectorAll('.pipe').forEach(pipe => pipe.remove());
    mario.src = "src/images/mario.gif";
    mario.style.width = "150px";
    mario.style.marginLeft = "0";
    scoreElement.innerText = `${translations[storedLanguage].score}0`;
    isGameOver = false;
    startGame();
};

document.addEventListener("keydown", jump);
restartButton.addEventListener("click", restartGame);
startGame();