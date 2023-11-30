'use client';

import { useEffect, useState } from 'react';
import { create_board, next_board_state } from '@/helpers/board';
import FileInput from '@/components/file-input';

export default function HomePage() {
  const create_board_element = (board: number[][]) =>
    board.map((row, i) => (
      <div key={i} className="flex">
        {row.map((item, j) =>
          item ? (
            <div key={`row-${i}-item-${j}`} className="border border-black w-16 h-16 bg-black" />
          ) : (
            <div key={`row-${i}-item-${j}`} className="border border-black w-16 h-16" />
          )
        )}
      </div>
    ));

  const [width, height] = [10, 10];

  const [boardDisplay, setBoard] = useState(create_board_element(create_board(width, height)));
  const [boardState, setBoardState] = useState(create_board(width, height));

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
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <FileInput loadBoard={loadBoard} />

        {boardDisplay}
      </div>
    </>
  );
}
