import { useGameContext } from '../../context/useGameContext';
import styles from './StartScreen.module.css';

function StartScreen() {
  const { dispatch } = useGameContext();

  return (
    <div className={styles['start-screen-container']}>
      <div className={styles['menu-header']}>
        <img></img>
        <p className={styles['game-title']}>WORDEL</p>
        <p className={styles['game-description']}>
          Get 6 chances to guess a 5-letter word
        </p>
      </div>
      <div className={styles['menu-container']}>
        <button
          className={styles['play-button']}
          onClick={() =>
            dispatch({ type: 'set-view', payload: { view: 'game' } })
          }
        >
          Play
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
