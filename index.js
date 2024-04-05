//@ts-nocheck
import { generateRandomMaze } from "./maze.js";
import { startStopwatch, stopStopwatch } from "./timer.js";

const canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 900;
const c = canvas.getContext("2d");

const cellSide = 50;

const player = {
  x: 0,
  y: 0,
  width: 50,
  height: 50,
  speed: 50,
};
const camera = {
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};
// Generate a random maze of size 16x16
const maze2D = generateRandomMaze(45, 40);
console.log(maze2D);

const getMap = () => {
  for (let i = 0; i < maze2D.length; i++) {
    for (let j = 0; j < maze2D[i].length; j++) {
      let x = j * cellSide - camera.x; // Adjust x position with camera offset
      let y = i * cellSide - camera.y; // Adjust y position with camera offset

      if (maze2D[i][j] === 0) {
        c.beginPath();
        c.fillStyle = "#fbfaf3";
        c.fillRect(x, y, cellSide, cellSide);
      }
      if (maze2D[i][j] === 3) {
        c.beginPath();
        c.fillStyle = "#ff3b2f";
        c.fillRect(x, y, cellSide, cellSide);
      }
      if (maze2D[i][j] === 1) {
        c.beginPath();
        c.fillStyle = "#007a2f";
        c.fillRect(x, y, cellSide, cellSide);
      }
    }
  }
};

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  getMap();
  c.fillStyle = "#3498db";
  camera.x = player.x - canvas.width / 2;
  camera.y = player.y - canvas.height / 2;
  c.fillRect(
    player.x - camera.x,
    player.y - camera.y,
    player.width,
    player.height
  ); // Adjust player position with camera offset

  c.beginPath();
};
document.addEventListener("keydown", (event) => {
  startStopwatch();
  let futureX = player.x;
  let futureY = player.y;
  switch (event.key) {
    case "ArrowUp":
      if (player.y > 0) {
        futureY -= player.speed;
      }
      break;
    case "ArrowDown":
      if (player.y < canvas.height - player.height) {
        futureY += player.speed;
      }
      break;

    case "ArrowLeft":
      if (player.x > 0) {
        futureX -= player.speed;
      }
      break;
    case "ArrowRight":
      if (player.x < canvas.width - player.width) {
        futureX += player.speed;
      }
      break;
  }

  if (!checkCollisionWithWall(futureX, futureY)) {
    player.x = futureX;
    player.y = futureY;
    console.log("test");
  }
});

const checkCollisionWithWall = (x, y) => {
  for (let i = 0; i < maze2D.length; i++) {
    for (let j = 0; j < maze2D[i].length; j++) {
      let tileX = j * cellSide;
      let tileY = i * cellSide;
      let wall = {
        x: tileX,
        y: tileY,
        width: cellSide,
        height: cellSide,
      };

      let futurePosition = {
        x: x,
        y: y,
        width: player.width,
        height: player.height,
      };
      if (maze2D[i][j] === 1) {
        if (isCollision(futurePosition, wall)) {
          return true;
        }
      }
      if (maze2D[i][j] === "F") {
        if (isCollision(futurePosition, wall)) {
          const endTime = document.getElementById("stopwatch").innerHTML;
          stopStopwatch();
          alert("You win! Your time was: " + endTime);
        }
      }
    }
  }
  return false;
};
const isCollision = (rect1, rect2) => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
};
animate();

