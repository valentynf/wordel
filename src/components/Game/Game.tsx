import { useEffect, useState } from 'react';
import Row from '../Row/Row';
import styles from './Game.module.css';

function Game() {
  const [currentGuess, setCurrentGuess] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.key);
      handleInput(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleInput = (letter: string) => {
    if (letter == ' ') console.log('SPACE');
    if (/^[A-Z]$/i.test(letter))
      setCurrentGuess((prev) => (prev.length < 5 ? prev + letter : prev));
    if (letter == 'Backspace')
      setCurrentGuess((prev) =>
        prev.length > 0 ? prev.slice(0, prev.length - 1) : prev
      );
  };

  return (
    <div className={styles['game-container']}>
      <Row wordInput={currentGuess} />
    </div>
  );
}

export default Game;
