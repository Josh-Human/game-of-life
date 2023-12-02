'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@mantine/core';
import { create_board, next_board_state } from '@/helpers/board';

export default function HomePage() {
  const board_container_width = document.querySelector('#board-container')?.clientWidth ?? 0;
  const board_container_height = document.querySelector('#board-container')?.clientHeight ?? 0;
  const board_size_to_use =
    board_container_width >= board_container_height
      ? board_container_height
      : board_container_width;
  const [board_width, board_height] = [50, 50];
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

  const [boardDisplay, setBoard] = useState(
    create_board_element(create_board(board_width, board_height))
  );
  const [boardState, setBoardState] = useState(create_board(board_width, board_height));

  useEffect(() => {
    setBoard(create_board_element(boardState));
    const timer = setTimeout(() => {
      setBoardState(next_board_state(boardState));
    }, 2000);
    return () => clearTimeout(timer);
  }, [boardState]);


  return (
    <>
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-2" />
          <div className="col-span-8 flex flex-col items-center">
            <h1 className="text-5xl whitespace-nowrap text-center mb-8 font-mono">
              Conway&apos;s Game of Life
            </h1>
            <div className="flex grow w-full" id="board-container">
              {boardDisplay}
            </div>
          </div>
          <div className="col-span-2" />
        </div>
    </>
  );
}
