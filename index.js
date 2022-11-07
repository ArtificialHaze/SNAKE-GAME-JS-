const canvas = document.querySelector("#snake");
const ctx = canvas.getContext("2d");

const box = 32;

const ground = new Image();
ground.src = "./ground.png";

const foodImage = new Image();
foodImage.src = "./food.png";

const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const down = new Audio();
const right = new Audio();

dead.src = "./dead.mp3";
eat.src = "./eat.mp3";
up.src = "./up.mp3";
left.src = "./left.mp3";
down.src = "./down.mp3";
right.src = "./right.mp3";

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

let score = 0;
let d;

document.addEventListener("keydown", direction);

function direction(e) {
  if (e.keyCode === 37 && d != "RIGHT") {
    left.play();
    d = "LEFT";
  } else if (e.keyCode === 38 && d != "DOWN") {
    up.play();
    d = "UP";
  } else if (e.keyCode === 39 && d != "LEFT") {
    right.play();
    d = "RIGHT";
  } else if (e.keyCode === 40 && d != "UP") {
    down.play();
    d = "DOWN";
  }
}

function draw() {
  ctx.drawImage(ground, 0, 0);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  ctx.drawImage(foodImage, food.x, food.y);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if ((d = "LEFT")) snakeX -= box;
  if ((d = "RIGHT")) snakeX += box;
  if ((d = "UP")) snakeX -= box;
  if ((d = "DOWN")) snakeX += box;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    eat.play();
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < 3 * box ||
    snakeY > 18 * box ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    dead.play();
  }

  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px monospace";
  ctx.fillText(score, 2 * box, 1.6 * box);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return false;
    }
  }
  return true;
}

let game = setInterval(draw, 1000);
