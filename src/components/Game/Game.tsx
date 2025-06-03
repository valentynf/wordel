import Row from '../Row/Row';
import styles from './Game.module.css';

function Game() {
  return (
    <div className={styles['game-container']}>
      <Row wordInput="sraka" />
    </div>
  );
}

export default Game;
