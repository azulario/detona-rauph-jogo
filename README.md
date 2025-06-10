# 🔨 Detona Ralph - Jogo Web

![GitHub repo size](https://img.shields.io/github/repo-size/azulario/detona-rauph-jogo)
![GitHub language count](https://img.shields.io/github/languages/count/azulario/detona-rauph-jogo)
![GitHub forks](https://img.shields.io/github/forks/azulario/detona-rauph-jogo)

Jogo web inspirado no filme "Detona Ralph" desenvolvido durante o bootcamp da DIO. O objetivo é clicar no Ralph que aparece aleatoriamente nas janelas antes que ele desapareça!

## 🎮 Como Jogar

- **Objetivo**: Clique no Ralph quando ele aparecer
- **Tempo**: 60 segundos para fazer o máximo de pontos
- **Dificuldade**: Velocidade aumenta progressivamente

## 💡 Funcionalidades Extras Implementadas

### 🚀 **Sistema de Velocidade Progressiva** (Além do projeto original)
- Ralph aparece mais rápido conforme o tempo passa
- Progressão suave a cada 5 segundos
- Balanceamento testado para melhor jogabilidade

```javascript
// Implementação personalizada
function updateGameSpeed() {
    const timeElapsed = state.values.initialTime - state.values.currentTime;
    const newVelocity = state.values.gameVelocity - (timeElapsed * state.values.velocityDecrease);
    const finalVelocity = Math.max(newVelocity, state.values.minVelocity);
    
    if (timeElapsed % 5 === 0) {
        clearInterval(state.actions.timerId);
        state.actions.timerId = setInterval(randomSquare, finalVelocity);
    }
}
```

**Progressão**: 1000ms (início) → 500ms (final) com mudanças graduais

## 🛠️ Tecnologias

- **HTML5** - Estrutura
- **CSS3** - Estilização e responsividade  
- **JavaScript ES6+** - Lógica do jogo
  - Manipulação DOM
  - Timers e Intervals
  - Audio API
  - Event Listeners

## 🚀 Como Executar

```bash
# Clone o repositório
git clone https://github.com/azulario/detona-rauph-jogo.git

# Entre na pasta
cd detona-rauph-jogo

# Abra no navegador ou use um servidor local
python -m http.server 8000
# ou
npx live-server
```

## 📁 Estrutura

```
detona-rauph-jogo/
├── index.html
├── src/
│   ├── styles/main.css
│   ├── scripts/engine.js
│   ├── images/
│   └── audios/
└── README.md
```

## 🎯 Aprendizados

- Manipulação avançada do DOM
- Controle de timers e eventos
- Organização de código com state pattern
- Implementação de funcionalidades além do escopo original

## 👨‍💻 Desenvolvedor

**Azulario** - [@azulario](https://github.com/azulario)

---

⭐ Projeto desenvolvido no bootcamp da **Digital Innovation One (DIO)** ⭐
