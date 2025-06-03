import { useEffect, useState } from 'react';
import Row from '../Row/Row';
import styles from './Game.module.css';

export type BoxStatus = 'correct' | 'present' | 'default';

function Game() {
  const answer = 'SHARK';
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [boxesStatus, setBoxesStatus] = useState<BoxStatus[]>(
    Array(5).fill('default')
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) =>
      e.key === 'Enter' && currentGuess.length === 5
        ? handleSubmit(currentGuess.toUpperCase())
        : handleInput(e.key);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentGuess]);

  const handleInput = (letter: string) => {
    if (/^[A-Z]$/i.test(letter))
      setCurrentGuess((prev) => (prev.length < 5 ? prev + letter : prev));
    if (letter == 'Backspace')
      setCurrentGuess((prev) =>
        prev.length > 0 ? prev.slice(0, prev.length - 1) : prev
      );
  };

  const handleSubmit = (guess: string) => {
    // const boxStatuses: BoxStatus[] = Array(5).fill('default');
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
      <Row boxesStatus={boxesStatus} wordInput={currentGuess} />
    </div>
  );
}

export default Game;
