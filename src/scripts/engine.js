const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
        bgMusic: new Audio('/src/audios/music.m4a'), // Background music
    },
    values: {
        gameVelocity: 1000, // milesegundos
        hitPosition: 0,
        result: 0,
        currentTime: 60, // segundos
        minVelocity: 300, // milisegundos
        velocityDecrease: 10, // milisegundos
        initialTime: 60, // segundos
        lives: 4,
        maxLives: 4,
    },

    actions: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000), // 1 second
    }
};


function setupBackgroundMusic() {
    state.view.bgMusic.volume = 0.5; 
    state.view.bgMusic.loop = true; // Loop the music
    
    }

function playSound() {
    let audio = new Audio('./src/audios/hit.m4a');
    audio.volume = 0.3; 
    audio.play();
}

function playSoundOnMiss() {
    let missAudio = new Audio('./src/audios/miss.wav');
    missAudio.volume = 0.4; 
    missAudio.play();
}

function playGameOverSound() {
    let gameOverAudio = new Audio('/src/audios/gameover.m4a');
    gameOverAudio.volume = 0.8; // Set volume to 50%
    gameOverAudio.play().catch(e => console.log("Error playing game over sound:", error));
}

function playEndingMusic() {
    let endingMusic = new Audio('/src/audios/ending.m4a');
    endingMusic.volume = 0.5; // volume mais suave
    endingMusic.play();
}

function startGame() {
    // Reseta o estado do jogo //
    state.values.result = 0;
    state.values.currentTime = state.values.initialTime;
    state.values.gameVelocity = 1000;
    state.values.lives = state.values.maxLives;
    updateLivesDisplay();
    
    // UI //
    state.view.score.textContent = 0;
    state.view.timeLeft.textContent = state.values.initialTime;

    // Reseta musica de fundo //
    state.view.bgMusic.currentTime = 0;
    state.view.bgMusic.play();

    // Reseta o temporizador //
    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimerId);

    // Novo temporizador //
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000); // 1 segundo


}

function confirmStart() {
    const start = confirm("Pronto para começar o jogo?");
    if (start) {
        startGame(); // chama a função principal de inicialização
    } else {
        alert("Quando quiser jogar, é só atualizar a página. 🎮");
    }
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    updateGameSpeed();

    if (state.values.currentTime <= 0) {
        gameOver();
     
    }
    
}

function updateGameSpeed() {
    
    // Calcula o tempo que já passou //
    const timeElapsed = state.values.initialTime - state.values.currentTime;

    // Calcula a nova velocidade do jogo baseado no tempo que passou//
    const newVelocity = state.values.gameVelocity - (timeElapsed * state.values.velocityDecrease);

    // Garante que a velocidade não fique abaixo do mínimo definido //
    const finalVelocity = Math.max(newVelocity, state.values.minVelocity);

    if (timeElapsed % 5 === 0 && finalVelocity !== state.values.gameVelocity) {
        clearInterval(state.actions.timerId);
        state.actions.timerId = setInterval(randomSquare, finalVelocity);
    }
    
}

function randomSquare() {
    state.view.squares.forEach((square) => {square.classList.remove("enemy")});

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function updateLivesDisplay() {
    const livesElement = document.querySelector('#lives');
    livesElement.textContent = `${state.values.lives}x`;
}

function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound()
            } else {
                state.values.lives--;
                playSoundOnMiss();
                updateLivesDisplay();
                

                if (state.values.lives <= 0) {
                    gameOver();
                
                }
            }
        });
    });
}



function gameOver() {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    state.view.bgMusic.pause();
    playGameOverSound();

    setTimeout(() => {
        if (confirm("Game Over! Seu Score é: " + state.values.result + "\nJogar novamente?")) {
            startGame();
        } else {
            playEndingMusic(); // toca a musiquinha de encerramento
    
            setTimeout(() => {
                alert("Obrigado por jogar! Quando quiser jogar, é só atualizar a página. 🎮");
            }, 800); // Dá um mini delay pro som começar antes da janela
        }
    }, 100);
    // Outras ações de fim de jogo, se quiser
}

function init() {
   
    setupBackgroundMusic();
    addListenerHitbox();
    confirmStart();
}

init ();