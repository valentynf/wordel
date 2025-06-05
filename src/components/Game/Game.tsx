import { useEffect } from 'react';
import styles from './Game.module.css';
import Row from './Row/Row';
import { useGameContext } from '../../hooks/useGameContext';

function Game() {
  const { state: gameData, dispatch } = useGameContext();
  const { rows, currentRow, hasWon } = gameData;

  useEffect(() => {
    const handleInput = (input: string) => {
      if (input === 'Enter' && rows[currentRow].letters.length === 5) {
        dispatch({ type: 'submit-guess' });
        if (currentRow < 5) dispatch({ type: 'next-row' });
      }
      if (/^[A-Z]$/i.test(input))
        dispatch({ type: 'add-letter', payload: { letter: input } });
      if (input === 'Backspace') dispatch({ type: 'remove-letter' });
    };
    const handleKeyDown = (e: KeyboardEvent) => handleInput(e.key);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentRow, dispatch, rows, hasWon]);

  return (
    <div className={styles['game-container']}>
      {gameData.rows.map((row, i) => (
        <Row key={i} boxStatuses={row.statuses} letters={row.letters} />
      ))}
    </div>
  );
}

export default Game;
