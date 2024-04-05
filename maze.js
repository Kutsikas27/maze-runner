//@ts-nocheck

export function generateRandomMaze(rows, cols) {
  // Initialize the maze grid with all walls
  let maze = [];
  for (let i = 0; i < rows; i++) {
    maze[i] = [];
    for (let j = 0; j < cols; j++) {
      maze[i][j] = 1; // 1 represents a wall
    }
  }

  // Generate random paths
  let stack = [];
  let current = { x: 0, y: 0 };
  maze[current.y][current.x] = 0; // 0 represents a path
  do {
    let neighbors = [];
    // Check neighboring cells
    if (current.x > 1 && maze[current.y][current.x - 2] === 1) {
      neighbors.push({ x: current.x - 2, y: current.y });
    }
    if (current.x < cols - 2 && maze[current.y][current.x + 2] === 1) {
      neighbors.push({ x: current.x + 2, y: current.y });
    }
    if (current.y > 1 && maze[current.y - 2][current.x] === 1) {
      neighbors.push({ x: current.x, y: current.y - 2 });
    }
    if (current.y < rows - 2 && maze[current.y + 2][current.x] === 1) {
      neighbors.push({ x: current.x, y: current.y + 2 });
    }

    if (neighbors.length) {
      let next = neighbors[Math.floor(Math.random() * neighbors.length)];
      stack.push(current);
      maze[next.y][next.x] = 0;
      maze[(current.y + next.y) / 2][(current.x + next.x) / 2] = 0; // Break the wall between current and next
      current = next;
    } else {
      current = stack.pop();
    }
  } while (stack.length);

  return maze;
}
