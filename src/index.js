class MoleGame {
    constructor() {
      this.holes = document.querySelectorAll(".hole");
      this.scoreBoard = document.querySelector(".score");
      this.moles = document.querySelectorAll(".mole");
      this.startButton = document.querySelector(".startBtn");
      this.stopButton = document.querySelector(".stopBtn");
      this.resetButton = document.querySelector(".resetBtn");
      this.timer = 0;
      this.lastHole = 0;
      this.timeUp = false;
      this.score = 0;
    }
  
    init() {
      this.moles.forEach((mole) =>
        mole.addEventListener("click", (e) => this.onStrike(e))
      );
      this.startButton.addEventListener("click", () => this.startGame());
      this.stopButton.addEventListener("click", () => this.endGame(this.score));
      this.resetButton.addEventListener("click", () => this.endGame());
    }
  
    generateRandomTime(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }
  
    getRandomHole(holes) {
      const idx = Math.floor(Math.random() * holes.length);
      const hole = holes[idx];
      if (hole === this.lastHole) {
        console.log("Ah nah thats the same one bud");
        return this.getRandomHole(holes);
      }
      this.lastHole = hole;
      return hole;
    }
  
    moleUp() {
      const time = this.generateRandomTime(200, 1000);
      const hole = this.getRandomHole(this.holes);
      hole.classList.add("up");
      this.timer = setTimeout(() => {
        hole.classList.remove("up");
        if (!this.timeUp) this.moleUp();
      }, time);
    }
  
    startGame() {
      this.scoreBoard.textContent = 0;
      this.timeUp = false;
      this.score = 0;
      this.moleUp();
      setTimeout(() => (this.timeUp = true), 30000);
    }
  
    endGame(finalScore = 0) {
      clearTimeout(this.timer);
      this.scoreBoard.textContent = finalScore;
      this.holes.forEach((mole) => {
        mole.classList.remove("up");
      });
    }
  
    onStrike(e) {
      if (!e.isTrusted) return;
      this.score++;
      e.target.parentNode.classList.remove("up");
      this.scoreBoard.textContent = this.score;
    }
  }
  
  const game = new MoleGame();
  game.init();
  