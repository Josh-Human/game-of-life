import { Skeleton } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useInterval } from '@mantine/hooks';
import { create_board, next_board_state } from '@/helpers/board';

interface BoardProps {
  columns: number;
  rows: number;
  board_state: number[][];
  setBoardState: (new_board: number[][]) => void;
  is_playing: boolean;
  delay: number;
}

export default function Board({
  columns,
  rows,
  board_state,
  setBoardState,
  is_playing,
  delay,
}: BoardProps) {
  const board_container_width = document.querySelector('#board-container')?.clientWidth ?? 0;
  const board_container_height = document.querySelector('#board-container')?.clientHeight ?? 0;
  const square_size_to_fit_rows = board_container_height / rows;
  const square_size_to_fit_columns = board_container_width / columns;
  const squareLength =
    square_size_to_fit_columns < square_size_to_fit_rows
      ? square_size_to_fit_columns
      : square_size_to_fit_rows;

  const create_board_element = (board: number[][]) => (
    <Skeleton
      visible={board_container_height === 0 || board_container_width === 0}
      className="h-full w-full"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((item, j) => (
            <div
              key={`row-${i}-item-${j}`}
              style={{ height: squareLength, width: squareLength }}
              className={`border border-black ${item ? 'bg-black' : ''}`}
            />
          ))}
        </div>
      ))}
    </Skeleton>
  );

  const [board_display, setBoard] = useState(create_board_element(create_board(columns, rows)));

  const board_interval = useInterval(() => {
    setBoardState(next_board_state(board_state));
  }, delay);

  useEffect(() => {
    setBoard(create_board_element(board_state));
    if (is_playing) {
      board_interval.start();
    }
    return () => board_interval.stop();
  }, [board_state]);

  useEffect(() => {
    if (is_playing) {
      board_interval.start();
    } else {
      board_interval.stop();
    }
  }, [is_playing]);

  return (
    <div className="flex grow w-full max-h-[50vh]" id="board-container">
      {board_display}
    </div>
  );
}
