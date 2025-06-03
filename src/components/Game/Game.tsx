import { useEffect, useState } from 'react';
import Row from '../Row/Row';
import styles from './Game.module.css';

function Game() {
  const [currentGuess, setCurrentGuess] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.key == ' ') console.log('SPACE');
      if (/^[A-Z]$/i.test(e.key)) handleAddLetter(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleAddLetter = (letter: string) => {
    setCurrentGuess((prev) => (prev.length < 5 ? prev + letter : prev));
  };

  return (
    <div className={styles['game-container']}>
      <Row wordInput={currentGuess} />
    </div>
  );
}

export default Game;
