const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
    },
    values: {
        gameVelocity: 1000, // milesegundos
        hitPosition: 0,
        result: 0,
        currentTime: 60, // segundos
        minVelocity: 350, // milisegundos
        velocityDecrease: 10, // milisegundos
        initialTime: 60, // segundos
    },

    actions: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000), // 1 second
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    updateGameSpeed();

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! Seu Score é: " + state.values.result);
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

function playSound() {
    let audio = new Audio('./src/audios/hit.m4a');
    audio.volume = 0.1; // Set volume to 10%
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {square.classList.remove("enemy")});

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound()
            }
        });
    });
}

function init() {
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    addListenerHitbox();
}

init ();