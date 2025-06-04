import { useEffect } from 'react';

import styles from './Game.module.css';

import Row from './Row/Row';
import useGameState from '../../hooks/useGameState';
// const answer = 'SHARK';

function Game() {
  const [gameData, dispatch] = useGameState();
  const { rows, currentRow } = gameData;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => handleInput(e.key);

    const handleInput = (input: string) => {
      if (input === 'Enter' && rows[currentRow].letters.length === 5) {
        dispatch({ type: 'submit-guess' });
        if (currentRow < 5) dispatch({ type: 'next-row' });
      }

      if (/^[A-Z]$/i.test(input))
        dispatch({ type: 'add-letter', payload: { letter: input } });

      if (input === 'Backspace') dispatch({ type: 'remove-letter' });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentRow, dispatch, rows]);

  return (
    <div className={styles['game-container']}>
      {gameData.rows.map((row, i) => (
        <Row key={i} boxStatuses={row.statuses} letters={row.letters} />
      ))}
    </div>
  );
}

export default Game;
