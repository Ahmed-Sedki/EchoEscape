export function createMaze(width, height) {
    let maze = Array.from({ length: height }, () => Array(width).fill(1));

    function carve(x, y) {
        const directions = shuffle([
            { x: 0, y: -1 },
            { x: 0, y: 1 },
            { x: -1, y: 0 },
            { x: 1, y: 0 },
        ]);

        directions.forEach(direction => {
            const nx = x + direction.x * 2;
            const ny = y + direction.y * 2;

            if (ny > 0 && ny < height && nx > 0 && nx < width && maze[ny][nx] === 1) {
                maze[ny][nx] = 0;
                maze[ny - direction.y][nx - direction.x] = 0;
                carve(nx, ny);
            }
        });
    }

    maze[1][1] = 0;
    carve(1, 1);

    maze[height - 2][width - 1] = 0;
    maze[height - 1][width - 1] = 0;

    return maze;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
