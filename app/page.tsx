'use client';

import { useState } from 'react';
import { IconPlayerPlay, IconRotateClockwise, IconSettings } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { create_board } from '@/helpers/board';
import FileInput from '@/components/file-input';
import Board from '@/components/Board';

export default function HomePage() {
  const [board_width, board_height] = [50, 50];
  const [board_state, setBoardState] = useState(create_board(board_width, board_height));

  const loadBoard = (board: number[][]) => {
    setBoardState(board);
  };

  return (
    <>
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-2" />
        <div className="col-span-8 flex flex-col items-center">
          <h1 className="text-5xl whitespace-nowrap text-center mb-8 font-mono">
            Conway&apos;s Game of Life
          </h1>
          <Board
            board_height={board_height}
            board_width={board_width}
            board_state={board_state}
            setBoardState={loadBoard}
          />
          <div className="flex w-full gap-3 justify-center align-bottom mt-8">
            <Button>
              <IconPlayerPlay />
            </Button>

            <Button variant="light">
              <IconRotateClockwise />
            </Button>

            <FileInput loadBoard={loadBoard} />
            <Button variant="white" rightSection={<IconSettings />}>
              Additional settings
            </Button>
          </div>
        </div>
        <div className="col-span-2" />
      </div>
    </>
  );
}
