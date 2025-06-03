import { useEffect, useState } from 'react';
import Row from '../Row/Row';
import styles from './Game.module.css';

export type BoxStatus = 'correct' | 'present' | 'default';
type Row = {
  letters: string[];
  statuses: BoxStatus[];
};

function Game() {
  const answer = 'SHARK';
  const [rows, setRows] = useState<Row[]>(
    Array(6).fill({
      letters: [],
      statuses: ['default', 'default', 'default', 'default', 'default'],
    })
  );
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [boxesStatus, setBoxesStatus] = useState<BoxStatus[]>(
    Array(5).fill('default')
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) =>
      e.key === 'Enter' && currentGuess.length === 5
        ? handleSubmit(currentGuess.toUpperCase())
        : handleInput(e.key, currentRowIndex);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentGuess, currentRowIndex]);

  const handleInput = (letter: string, currentRow: number) => {
    if (/^[A-Z]$/i.test(letter))
      setRows((prev) =>
        prev.map((row, i) =>
          i === currentRow
            ? {
                ...row,
                letters:
                  row.letters.length < 5
                    ? [...row.letters, letter]
                    : row.letters,
              }
            : row
        )
      );

    if (letter == 'Backspace')
      setRows((prev) =>
        prev.map((row, i) =>
          i === currentRow
            ? {
                ...row,
                letters:
                  row.letters.length > 0
                    ? row.letters.slice(0, row.letters.length - 1)
                    : row.letters,
              }
            : row
        )
      );
  };

  const handleSubmit = (guess: string) => {
    const lettersGuess: string[] = guess.split('');
    const lettersAnswer: string[] = answer.split('');
    const boxStatuses: BoxStatus[] = lettersGuess
      .map((letter) => (answer.includes(letter) ? 'present' : 'default'))
      .map((status, i) =>
        lettersGuess[i] === lettersAnswer[i] ? 'correct' : status
      );
    setBoxesStatus(boxStatuses);

    console.log(guess);
    console.log(answer);
    console.log(boxStatuses);
  };

  return (
    <div className={styles['game-container']}>
      {/* <Row boxesStatus={boxesStatus} wordInput={currentGuess} /> */}
      {rows.map((row, i) => (
        <Row key={i} boxStatuses={row.statuses} letters={row.letters} />
      ))}
    </div>
  );
}

export default Game;
