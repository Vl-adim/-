class PoleGame {
  score = 0;
  speed = 500;
  constructor(x, y, game, cell, result, best, bestResult) {
    this.game = game;
    this.cell = cell;
    this.x = x;
    this.y = y;
    this.result = result;
    this.best = best;
    this.bestResult = bestResult;
  }

  createNumber(value) {
    this.result = document.createElement("div");
    document.body.appendChild(this.result);
    this.result.classList.add("result");

    this.result.textContent = `Ваши очки: ${this.score}`;

    this.best = document.createElement("div");
    document.body.appendChild(this.best);
    this.best.classList.add("best");

    if (!localStorage.getItem("bestResult")) {
      localStorage.setItem("bestResult", 0);
    }
    this.best.textContent = `Рекорд: ${localStorage.bestResult}`;
  }

  createDiv() {
    this.game = document.createElement("div");
    document.body.appendChild(this.game);
    this.game.classList.add("game");

    for (let i = 1; i < 101; i++) {
      this.cell = document.createElement("div");
      this.game.appendChild(this.cell);
      this.cell.classList.add("cell");
    }
  }

  createCell() {
    this.cell = document.getElementsByClassName("cell");
    this.x = 1;
    this.y = 10;

    for (let i = 0; i < this.cell.length; i++) {
      if (this.x > 10) {
        this.x = 1;
        this.y--;
      }
      this.cell[i].setAttribute("posX", this.x);
      this.cell[i].setAttribute("posY", this.y);
      this.x++;
    }
  }
}

let poleGame = new PoleGame();
poleGame.createNumber();
poleGame.createDiv();
poleGame.createCell();

class Apple extends PoleGame {
  constructor(game, cell, x, y, appleCoordinates, apple, snakeBody, a, b) {
    super(game, cell, x, y);
    this.appleCoordinates = appleCoordinates;
    this.apple = apple;
    this.snakeBody = snakeBody;
    this.a = a;
    this.b = b;
  }

  randomPosition() {
    this.posX = Math.round(Math.random() * (10 - 1) + 1);
    this.posY = Math.round(Math.random() * (10 - 1) + 1);
    this.appleCoordinates = [this.posX, this.posY];
  }

  createElementApple() {
    this.apple = document.querySelector(
      '[posX = "' +
        this.appleCoordinates[0] +
        '"][posY = "' +
        this.appleCoordinates[1] +
        '"]'
    );

    while (this.apple.classList.contains("snakeBody")) {
      this.apple = document.querySelector(
        '[posX = "' +
          this.appleCoordinates[0] +
          '"][posY = "' +
          this.appleCoordinates[1] +
          '"]'
      );
      this.apple.classList.add("apple");
    }

    this.apple.classList.add("apple");
  }
}

let apples = new Apple();
apples.randomPosition();
apples.createElementApple();

class Snake extends PoleGame {
  constructor(
    direction,
    steps,
    game,
    cell,
    x,
    y,
    posX,
    posY,
    coordinates,
    snakeBody,
    snakeCoordinates,
    interval,
    bestResult,
    score,
    apple,
    a,
    b,
    result,
    best
  ) {
    super(game, cell, x, y, bestResult, score);
    this.posX = posX;
    this.posY = posY;
    this.coordinates = coordinates;
    this.snakeBody = snakeBody;
    this.direction = direction;
    this.steps = steps;
    this.snakeCoordinates = snakeCoordinates;
    this.interval = interval;
    this.bestResult = bestResult;
    this.apple = apple;
    this.a = a;
    this.b = b;
    this.result = result;
    this.best = best;
    this.bestResult = bestResult;
  }

  randomPosition() {
    this.posX = 5;
    this.posY = 6;
    this.coordinates = [this.posX, this.posY];
  }

  createElementSnake() {
    this.snakeBody = [
      document.querySelector(
        '[posX = "' +
          this.coordinates[0] +
          '"][posY = "' +
          this.coordinates[1] +
          '"]'
      ),
      document.querySelector(
        '[posX = "' +
          (this.coordinates[0] - 1) +
          '"][posY = "' +
          this.coordinates[1] +
          '"]'
      ),
    ];

    for (let i = 0; i < this.snakeBody.length; i++) {
      this.snakeBody[i].classList.add("snakeBody");
    }
    this.snakeBody[0].classList.add("snakeHead");
  }
  move() {
    this.snakeCoordinates = [
      this.snakeBody[0].getAttribute("posX"),
      this.snakeBody[0].getAttribute("posY"),
    ];
    this.snakeBody[0].classList.remove("snakeHead");
    this.snakeBody[this.snakeBody.length - 1].classList.remove("snakeBody");
    this.snakeBody.pop();

    if (this.direction == "right") {
      if (this.snakeCoordinates[0] < 10) {
        this.snakeBody.unshift(
          document.querySelector(
            '[posX = "' +
              (+this.snakeCoordinates[0] + 1) +
              '"][posY = "' +
              this.snakeCoordinates[1] +
              '"]'
          )
        );
      } else {
        clearInterval(this.interval);
      }
    } else if (this.direction == "left") {
      if (this.snakeCoordinates[0] > 1) {
        this.snakeBody.unshift(
          document.querySelector(
            '[posX = "' +
              (+this.snakeCoordinates[0] - 1) +
              '"][posY = "' +
              this.snakeCoordinates[1] +
              '"]'
          )
        );
      } else {
        clearInterval(this.interval);
      }
    } else if (this.direction == "up") {
      if (this.snakeCoordinates[1] < 10) {
        this.snakeBody.unshift(
          document.querySelector(
            '[posX = "' +
              this.snakeCoordinates[0] +
              '"][posY = "' +
              (+this.snakeCoordinates[1] + 1) +
              '"]'
          )
        );
      } else {
        clearInterval(this.interval);
      }
    } else if (this.direction == "down") {
      if (this.snakeCoordinates[1] > 1) {
        this.snakeBody.unshift(
          document.querySelector(
            '[posX = "' +
              this.snakeCoordinates[0] +
              '"][posY = "' +
              (+this.snakeCoordinates[1] - 1) +
              '"]'
          )
        );
      } else {
        clearInterval(this.interval);
      }
    }

    if (
      this.snakeBody[0].getAttribute("posX") ==
        apples.apple.getAttribute("posX") &&
      this.snakeBody[0].getAttribute("posY") ==
        apples.apple.getAttribute("posY")
    ) {
      apples.apple.classList.remove("apple");

      this.posX = Math.round(Math.random() * (10 - 1) + 1);
      this.posY = Math.round(Math.random() * (10 - 1) + 1);
      this.appleCoordinates = [this.posX, this.posY];

      apples.apple = document.querySelector(
        '[posX = "' +
          this.appleCoordinates[0] +
          '"][posY = "' +
          this.appleCoordinates[1] +
          '"]'
      );

      while (apples.apple.classList.contains("snakeBody")) {
        this.posX = Math.round(Math.random() * (10 - 1) + 1);
        this.posY = Math.round(Math.random() * (10 - 1) + 1);
        this.appleCoordinates = [this.posX, this.posY];
        apples.apple = document.querySelector(
          '[posX = "' +
            this.appleCoordinates[0] +
            '"][posY = "' +
            this.appleCoordinates[1] +
            '"]'
        );
      }

      apples.apple.classList.add("apple");

      this.a = this.snakeBody[this.snakeBody.length - 1].getAttribute("posX");
      this.b = this.snakeBody[this.snakeBody.length - 1].getAttribute("posY");

      this.snakeBody.push(
        document.querySelector(
          '[posX = "' + this.a + '"][posY ="' + this.b + '"]'
        )
      );

      poleGame.score++;
      poleGame.result.textContent = `Ваши очки: ${poleGame.score}`;

      if (poleGame.score > localStorage.getItem("bestResult")) {
        poleGame.bestResult = poleGame.score;
        localStorage.setItem("bestResult", poleGame.bestResult);
        poleGame.best.textContent = `Рекорд: ${poleGame.bestResult}`;
      }
    }

    if (this.snakeBody[0].classList.contains("snakeBody")) {
      if (
        confirm(
          `Игра окончена. Набрано очков: ${poleGame.score}. Начать заново?`
        )
      ) {
        window.location.reload();
      } else {
        let restart = document.createElement("button");
        document.body.appendChild(restart);
        restart.classList.add("button");
        restart.innerText = "Restart";
        restart.addEventListener("click", () => {
          window.location.reload();
        });
      }
      clearInterval(this.interval);
    }

    this.snakeBody[0].classList.add("snakeHead");
    for (let i = 0; i < this.snakeBody.length; i++) {
      this.snakeBody[i].classList.add("snakeBody");
    }
    this.steps = true;
  }

  control() {
    this.direction;
    this.steps;
    window.addEventListener("keydown", function (e) {
      if (snake.steps == true) {
        if (e.key === "ArrowLeft" && snake.direction !== "right") {
          snake.direction = "left";
          snake.steps = false;
        } else if (e.key === "ArrowUp" && snake.direction !== "down") {
          snake.direction = "up";
          snake.steps = false;
        } else if (e.key === "ArrowRight" && snake.direction !== "left") {
          snake.direction = "right";
          snake.steps = false;
        } else if (e.key === "ArrowDown" && snake.direction !== "up") {
          snake.direction = "down";
          snake.steps = false;
        }
      }
    });
  }

  initInterval() {
    this.interval = setInterval(() => {
      this.move();
    }, this.speed);
  }
}

let snake = new Snake("right");
snake.randomPosition();
snake.createElementSnake();
snake.move();
snake.control();

function startGame() {
  if (startGame.isRun) {
    return false;
  }
  start();
  startGame.isRun = true;
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("cell")) {
    startGame();
  }
});

function start() {
  snake.initInterval();
}
