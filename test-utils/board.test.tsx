import { create_board, next_board_state } from '@/helpers/board';

describe('Board helpers', () => {
  describe('Create board', () => {
    it('empty array', () => {
      const actual = create_board(0, 0);

      expect(actual).toEqual([]);
    });

    it('1x1', () => {
      const actual = create_board(1, 1);

      expect(actual.length).toBe(1);
      expect(actual[0].length).toBe(1);
    });

    it('5x5', () => {
      const actual = create_board(5, 5);

      expect(actual.length).toBe(5);
      expect(actual.every((row) => row.length === 5)).toBeTruthy();
      expect(actual.every((row) => row.every((item) => item === 0 || item === 1))).toBeTruthy();
    });

    it('3x5', () => {
      const actual = create_board(3, 5);

      expect(actual.length).toBe(5);
      expect(actual.every((row) => row.length === 3)).toBeTruthy();
      expect(actual.every((row) => row.every((item) => item === 0 || item === 1))).toBeTruthy();
    });

    it('5x3', () => {
      const actual = create_board(5, 3);

      expect(actual.length).toBe(3);
      expect(actual.every((row) => row.length === 5)).toBeTruthy();
      expect(actual.every((row) => row.every((item) => item === 0 || item === 1))).toBeTruthy();
    });
  });

  describe('Next board state', () => {
    it('A live cell, in the middle, with 0 live neighbours dies', () => {
      const initial_board_state = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ];
      const actual = next_board_state(initial_board_state);

      const expected = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      expect(actual).toEqual(expected);
    });

    it('A live cell, in the first cell, with 0 live neighbours dies', () => {
      const initial_board_state = [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      const actual = next_board_state(initial_board_state);

      const expected = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      expect(actual).toEqual(expected);
    });

    it('Two live cells, with 0 live neighbours dies', () => {
      const initial_board_state = [
        [0, 0, 1],
        [0, 0, 0],
        [1, 0, 0],
      ];
      const actual = next_board_state(initial_board_state);

      const expected = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      expect(actual).toEqual(expected);
    });

    it('A live cell, in the middle, with 1 live neighbours dies', () => {
      const initial_board_state = [
        [0, 0, 0],
        [0, 1, 1],
        [0, 0, 0],
      ];
      const actual = next_board_state(initial_board_state);

      const expected = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      expect(actual).toEqual(expected);
    });

    it('A live cell, in the first cell, with 1 live neighbours dies', () => {
      const initial_board_state = [
        [1, 0, 0],
        [1, 0, 0],
        [0, 0, 0],
      ];
      const actual = next_board_state(initial_board_state);

      const expected = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      expect(actual).toEqual(expected);
    });

    it('Two live cells, with 1 live neighbours dies', () => {
      const initial_board_state = [
        [0, 0, 1],
        [1, 0, 1],
        [1, 0, 0],
      ];
      const actual = next_board_state(initial_board_state);

      const expected = [
        [0, 1, 0],
        [0, 0, 0],
        [0, 1, 0],
      ];

      expect(actual).toEqual(expected);
    });

    it('Alive cell with two cells stays alive', () => {
      const initial_board_state = [
        [0, 0, 1],
        [0, 1, 0],
        [1, 0, 0],
      ];
      const actual = next_board_state(initial_board_state);

      const expected = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ];

      expect(actual).toEqual(expected);
    });

    it('Alive cell with three alive neighbours stays alive', () => {
      const initial_board_state = [
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 0],
      ];
      const actual = next_board_state(initial_board_state);

      const expected = [
        [0, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ];

      expect(actual).toEqual(expected);
    });

    it('Alive cell with more than three alive neighbours dies', () => {
      const initial_board_state = [
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
      ];
      const actual = next_board_state(initial_board_state);

      const expected = [
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 0],
      ];

      expect(actual).toEqual(expected);
    });

    it('A dead cell with exactly three alive neighbours lives', () => {
      const initial_board_state = [
        [1, 0, 1],
        [0, 0, 0],
        [1, 0, 0],
      ];
      const actual = next_board_state(initial_board_state);

      const expected = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ];

      expect(actual).toEqual(expected);
    });
  });
});
