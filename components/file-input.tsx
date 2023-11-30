import { Group, FileButton, Button } from '@mantine/core';
import { useEffect, useState } from 'react';

interface FileInputProps {
  loadBoard: (board: number[][]) => void;
}

export default function FileInput({ loadBoard }: FileInputProps) {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fr = new FileReader();
    fr.onload = function () {
      const text = fr.result as string;
      const digitsArray = text.trimEnd().split('\r\n');
      const board = digitsArray.map((charArray) =>
        charArray.split('').map((char) => parseInt(char, 10))
      );
      loadBoard(board);
    };

    if (file) {
      fr.readAsText(file.slice(0, file.size));
    }
  }, [file]);
  return (
    <>
      <Group className="my-5 justify-center">
        <FileButton onChange={setFile} accept=".txt">
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
      </Group>
    </>
  );
}
