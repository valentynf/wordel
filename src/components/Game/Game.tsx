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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) =>
      e.key === 'Enter' && rows[currentRowIndex].letters.length === 5
        ? handleSubmit(rows[currentRowIndex].letters, currentRowIndex)
        : handleInput(e.key, currentRowIndex);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [rows, currentRowIndex]);

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

  const handleSubmit = (lettersGuess: string[], currentRow: number) => {
    const lettersAnswer: string[] = answer.split('');
    const boxStatuses: BoxStatus[] = lettersGuess
      .map((letter) =>
        answer.includes(letter.toUpperCase()) ? 'present' : 'default'
      )
      .map((status, i) =>
        lettersGuess[i].toUpperCase() === lettersAnswer[i].toUpperCase()
          ? 'correct'
          : status
      );

    setRows((prev) =>
      prev.map((row, i) =>
        i === currentRow
          ? {
              ...row,
              statuses: boxStatuses,
            }
          : row
      )
    );

    setCurrentRowIndex((prev) => prev + 1);

    console.log(lettersGuess.join(''));
    console.log(answer);
    console.log(boxStatuses);
  };

  return (
    <div className={styles['game-container']}>
      {rows.map((row, i) => (
        <Row key={i} boxStatuses={row.statuses} letters={row.letters} />
      ))}
    </div>
  );
}

export default Game;
