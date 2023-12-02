'use client';

import { useState } from 'react';
import { IconArrowRight, IconPlayerPause, IconPlayerPlay, IconSettings } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { create_board, next_board_state } from '@/helpers/board';
import FileInput from '@/components/file-input';
import Board from '@/components/Board';

export default function HomePage() {
  const [board_width, board_height] = [50, 50];
  const [board_state, setBoardState] = useState(create_board(board_width, board_height));
  const [is_playing, setIsPlaying] = useState(true);

  const loadBoard = (board: number[][]) => {
    setBoardState(board);
  };

  const setNextBoardState = () => {
    setBoardState(next_board_state(board_state));
  };

  const playOrPauseIcon = is_playing ? <IconPlayerPause /> : <IconPlayerPlay />;

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
            is_playing={is_playing}
          />
          <div className="flex w-full gap-3 justify-center align-bottom mt-8">
            <Button
              onClick={() => {
                setIsPlaying(!is_playing);
              }}
            >
              {playOrPauseIcon}
            </Button>
            <Button disabled={is_playing} onClick={setNextBoardState}>
              <IconArrowRight />
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
