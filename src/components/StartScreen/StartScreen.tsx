import { useEffect, useState } from 'react';
import Menu from './Menu/Menu';
import styles from './StartScreen.module.css';
import { LOCAL_STORAGE_KEY } from '../../config';
import type { GameState } from '../../types/appTypes';

function StartScreen() {
  const [prevGameState, setPrevGameState] = useState<GameState | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setPrevGameState(JSON.parse(stored));
  }, []);

  return (
    <div className={styles['start-screen-container']}>
      <div className={styles['menu-header']}>
        <img></img>
        <p className={styles['game-title']}>WORDEL</p>
        <p className={styles['game-description']}>
          Get 6 chances to guess a 5-letter word
        </p>
      </div>
      {prevGameState ? <Menu prevGameState={prevGameState} /> : <Menu />}
    </div>
  );
}

export default StartScreen;
