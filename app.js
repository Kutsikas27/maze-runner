// @ts-nocheck
import { startStopwatch } from "./timer.js";
const playerBox = document.getElementById("player-box");
const container = document.getElementById("container");
const wallEl = document.getElementById("wall");

const player = {
  x: playerBox.offsetLeft,
  y: playerBox.offsetTop,
  clientWidth: playerBox.clientWidth,
  clientHeight: playerBox.clientHeight,
};

const wall = {
  x: wallEl.offsetLeft,
  y: wallEl.offsetTop,
  clientWidth: wallEl.clientWidth,
  clientHeight: wallEl.clientHeight,
};

document.addEventListener("keydown", (event) => {
  startStopwatch();
  let canMove = true;

  switch (event.key) {
    case "ArrowUp":
      if (player.y > 0) {
        player.y -= 10;
      }
      break;
    case "ArrowDown":
      if (player.y < container.clientHeight - playerBox.clientHeight) {
        player.y += 10;
      }
      break;
    case "ArrowLeft":
      if (player.x > 0) {
        player.x -= 10;
      }
      break;
    case "ArrowRight":
      if (player.x < container.clientWidth - playerBox.clientWidth) {
        player.x += 10;
      }
      break;
  }

  if (aabb(player, wall)) {
    canMove = false;
  }

  if (!canMove) {
    switch (event.key) {
      case "ArrowUp":
        player.y += 10;
        break;
      case "ArrowDown":
        player.y -= 10;
        break;
      case "ArrowLeft":
        player.x += 10;
        break;
      case "ArrowRight":
        player.x -= 10;
        break;
    }
  }
  updatePlayerPosition();
});

const aabb = (a, b) => {
  return (
    a.x < b.x + b.clientWidth &&
    a.x + a.clientWidth > b.x &&
    a.y < b.y + b.clientHeight &&
    a.y + a.clientHeight > b.y
  );
};

const updatePlayerPosition = () =>
  (playerBox.style.transform = `translate(${player.x}px, ${player.y}px)`);
