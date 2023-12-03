'use client';

import { useEffect, useState } from 'react';
import {
  IconArrowLeft,
  IconArrowRight,
  IconPlayerPause,
  IconPlayerPlay,
  IconSettings,
} from '@tabler/icons-react';
import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerRoot,
  DrawerTitle,
  NumberInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { create_board, next_board_state } from '@/helpers/board';
import FileInput from '@/components/file-input';
import Board from '@/components/Board';

export default function HomePage() {
  const [columns, setColumns] = useState(5);
  const [rows, setRows] = useState(5);
  const [step_delay, setStepDelay] = useState(2000);

  const [board_state, setBoardState] = useState(create_board(columns, rows));
  const [is_playing, setIsPlaying] = useState(true);
  const [previous_boards, setPreviousBoards] = useState<number[][][]>([]);
  const [opened, { open, close }] = useDisclosure(false);

  const loadBoard = (board: number[][]) => {
    setPreviousBoards(() => [...previous_boards, board]);
    setBoardState(board);
  };

  const showNextBoard = () => {
    loadBoard(next_board_state(board_state));
  };

  const showPreviousBoard = () => {
    setBoardState(previous_boards.at(-2) ?? []);
    setPreviousBoards(previous_boards.slice(0, -1));
  };

  const handleRowChange = (value: string | number) => {
    if (typeof value === 'string') {
      setRows(parseInt(value, 10));
    } else {
      setRows(value);
    }
  };

  const handleColumnChange = (value: string | number) => {
    if (typeof value === 'string') {
      setColumns(parseInt(value, 10));
    } else {
      setColumns(value);
    }
  };

  const handleStepDelayChange = (value: string | number) => {
    if (typeof value === 'string') {
      setStepDelay(parseInt(value, 10));
    } else {
      setStepDelay(value);
    }
  };

  useEffect(() => {
    setBoardState(create_board(columns, rows));
  }, [rows, columns]);

  const playOrPauseIcon = is_playing ? <IconPlayerPause /> : <IconPlayerPlay />;

  return (
    <>
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-2" />
        <div className="col-span-8 flex flex-col items-center">
          <h1 className="md:text-4xl text-lg whitespace-nowrap text-center font-mono mb-8">
            Conway&apos;s Game of Life
          </h1>
          <div className="flex w-full gap-3 justify-center align-bottom mb-6">
            <Button
              disabled={is_playing || previous_boards.length <= 1}
              onClick={showPreviousBoard}
            >
              <IconArrowLeft />
            </Button>
            <Button
              onClick={() => {
                setIsPlaying(!is_playing);
              }}
            >
              {playOrPauseIcon}
            </Button>
            <Button disabled={is_playing} onClick={showNextBoard}>
              <IconArrowRight />
            </Button>
            <Button variant="white" rightSection={<IconSettings />} onClick={open}>
              Settings
            </Button>
          </div>

          <Board
            rows={rows}
            columns={columns}
            board_state={board_state}
            setBoardState={loadBoard}
            is_playing={is_playing}
            delay={step_delay}
          />
        </div>
        <div className="col-span-2" />
      </div>
      <DrawerRoot position="right" opened={opened} onClose={close}>
        <DrawerOverlay style={{ backgroundOpacity: 0.5, blur: 4 }} />
        <DrawerContent>
          <DrawerHeader style={{ padding: 50 }}>
            <DrawerCloseButton style={{ marginLeft: 0, marginRight: 0 }} />
            <DrawerTitle
              style={{
                display: 'flex',
                flexGrow: 1,
                justifyContent: 'center',
                fontWeight: 'bold',
              }}
            >
              Additional settings
            </DrawerTitle>
          </DrawerHeader>
          <DrawerBody style={{ padding: '15px 50px' }}>
            <FileInput loadBoard={loadBoard} />

            <div className="flex mt-5 mb-2 gap-3">
              <NumberInput
                label="Rows"
                allowDecimal={false}
                allowNegative={false}
                allowLeadingZeros={false}
                clampBehavior="strict"
                min={0}
                defaultValue={rows}
                onChange={(value) => handleRowChange(value)}
              />
              <NumberInput
                label="Columns"
                allowDecimal={false}
                allowNegative={false}
                allowLeadingZeros={false}
                clampBehavior="strict"
                min={0}
                defaultValue={columns}
                onChange={(value) => handleColumnChange(value)}
              />
            </div>
            <NumberInput
              label="Step delay"
              allowDecimal={false}
              allowNegative={false}
              allowLeadingZeros={false}
              clampBehavior="strict"
              suffix=" ms"
              min={200}
              defaultValue={step_delay}
              onChange={(value) => handleStepDelayChange(value)}
            />
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    </>
  );
}
