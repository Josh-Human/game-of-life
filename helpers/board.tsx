let seed = 1;

const create_seeded_random = () => {
  seed += 1;
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const create_board = (width: number, height: number): number[][] => {
  const empty_board: number[][] = Array(height).fill(Array(width).fill(0));
  const initial_board = empty_board.map((row) =>
    row.map((_) => Math.floor(create_seeded_random() * 2))
  );
  return initial_board;
};

export const next_board_state = (board: number[][]) => {
  // Any live cell with 0 or 1 live neighbors becomes dead
  // Any live cell with 2 or 3 live neighbors stays alive, because its neighborhood is just right
  // Any live cell with more than 3 live neighbors becomes dead, because of overpopulation
  // Any dead cell with exactly 3 live neighbors becomes alive, by reproduction

  const new_board = board.map((row, i) =>
    row.map((item, j) => {
      const neighbours = [];

      if (i > 0) {
        neighbours.push(board[i - 1][j]);
        if (j > 0) {
          neighbours.push(board[i - 1][j - 1]);
        }
        if (j < row.length - 1) {
          neighbours.push(board[i - 1][j + 1]);
        }
      }

      if (i < board.length - 1) {
        neighbours.push(board[i + 1][j]);

        if (j > 0) {
          neighbours.push(board[i + 1][j - 1]);
        }
        if (j < row.length - 1) {
          neighbours.push(board[i + 1][j + 1]);
        }
      }

      if (j > 0) {
        neighbours.push(board[i][j - 1]);
      }
      if (j < row.length - 1) {
        neighbours.push(board[i][j + 1]);
      }

      const countAlive = neighbours.filter((x) => x === 1).length;
      if (item === 1 && countAlive <= 1) {
        return 0;
      }

      if (item === 1 && countAlive > 3) {
        return 0;
      }

      if (item === 0 && countAlive === 3) {
        return 1;
      }

      return item;
    })
  );

  return new_board;
};
