import { randomInt } from 'crypto';

export default function HomePage() {
  const create_board = (width: number, height: number): number[][] => {
    const empty_board = Array(height).fill(Array(width).fill(0));
    const initial_board = empty_board.map((row) => row.map((_) => randomInt(2)));

    return initial_board;
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        {create_board(5, 5).map((row, i) => (
            <div key={i} className="flex">
              {row.map((item, j) => <span key={j} className={`border border-black w-16 h-16 ${item ? 'bg-black' : ''}`} />)}
            </div>
          ))}
      </div>
    </>
  );
}
