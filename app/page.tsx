'use client';

import { useEffect, useState } from 'react';
import { IconPlayerPlay, IconRotateClockwise, IconSettings } from '@tabler/icons-react';
import { Button, Skeleton } from '@mantine/core';
import { create_board, next_board_state } from '@/helpers/board';
import FileInput from '@/components/file-input';

export default function HomePage() {
  const board_container_width = document.querySelector('#board-container')?.clientWidth ?? 0;
  const [board_width, board_height] = [50, 50];
  const squareLength = board_container_width / board_width;

  const create_board_element = (board: number[][]) => (
    <Skeleton visible={board_container_width === 0} className="h-[500px] w-[500px]">
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

  const loadBoard = (board: number[][]) => {
    setBoardState(board);
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center">
        <div className="grid grid-cols-12">
          <div className="col-span-2" />
          <div className="col-span-8 flex flex-col items-center" id="board-container">
            <h1 className="text-5xl size text-center mb-8 font-mono">Conway's Game of Life</h1>
            {boardDisplay}
          </div>
          <div className="col-span-2" />
        </div>
      </div>
    </>
  );
}
