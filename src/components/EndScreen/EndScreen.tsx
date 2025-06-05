import { useGameContext } from '../../hooks/useGameContext';
import styles from './EndScreen.module.css';

function EndScreen() {
  const { state: gameData, dispatch } = useGameContext();
  const { hasWon } = gameData;

  return (
    <div className={styles['end-screen-container']}>
      <p className={styles['message']}>
        {hasWon ? 'CONGRATULATIONS' : 'GAME OVER'}
      </p>
      <button
        onClick={() => dispatch({ type: 'try-again' })}
        className={styles['play-again-button']}
      >
        Play again
      </button>
    </div>
  );
}

export default EndScreen;
