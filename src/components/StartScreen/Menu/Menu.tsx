import { LOCAL_STORAGE_KEY } from '../../../config';
import { useGameContext } from '../../../hooks/useGameContext';
import type { GameState } from '../../../types/appTypes';
import styles from './Menu.module.css';

type MenuProps = {
  prevGameState?: GameState | null;
};

function Menu({ prevGameState }: MenuProps) {
  const { dispatch } = useGameContext();
  console.log(prevGameState, 'Menu');

  return (
    <div className={styles['menu-container']}>
      <div className={styles['menu-container']}>
        {prevGameState && (
          <button
            className={styles['play-button']}
            onClick={() => {
              dispatch({
                type: 'continue-game',
                payload: { loadedGameState: prevGameState },
              });
              localStorage.removeItem(LOCAL_STORAGE_KEY); // not sure it really makes sense, leaving it for now
            }}
          >
            Continue
          </button>
        )}
        <button
          className={styles['play-button']}
          onClick={() => {
            dispatch({ type: 'new-game' });
            localStorage.removeItem(LOCAL_STORAGE_KEY);
          }}
        >
          New Game
        </button>
      </div>
    </div>
  );
}

export default Menu;
