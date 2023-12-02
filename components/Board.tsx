import { Skeleton } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useInterval } from '@mantine/hooks';
import { create_board, next_board_state } from '@/helpers/board';

interface BoardProps {
  board_width: number;
  board_height: number;
  board_state: number[][];
  setBoardState: (new_board: number[][]) => void;
  is_playing: boolean;
}

export default function Board({
  board_width,
  board_height,
  board_state,
  setBoardState,
  is_playing,
}: BoardProps) {
  const board_container_width = document.querySelector('#board-container')?.clientWidth ?? 0;
  const board_container_height = document.querySelector('#board-container')?.clientHeight ?? 0;
  const board_size_to_use =
    board_container_width >= board_container_height
      ? board_container_height
      : board_container_width;
  const squareLength = board_size_to_use / board_width;

  const create_board_element = (board: number[][]) => (
    <Skeleton
      visible={board_size_to_use === 0}
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

  const [board_display, setBoard] = useState(
    create_board_element(create_board(board_width, board_height))
  );

  const board_interval = useInterval(() => {
    setBoardState(next_board_state(board_state));
  }, 2000);

  useEffect(() => {
    setBoard(create_board_element(board_state));
    board_interval.start();
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
    <div className="flex grow w-full" id="board-container">
      {board_display}
    </div>
  );
}
