import { useEffect, useState } from 'react';
import styles from './Game.module.css';
import Row from './Row/Row';
import { useGameContext } from '../../hooks/useGameContext';
import useRandomWord from '../../hooks/useRandomWord';
import useGameInputHandler from '../../hooks/useGameInputHandler';
import Loader from './Loader/Loader';
import Keyboard from './Keyboard/Keyboard';
import Toast from './Toast/Toast';

function Game() {
  const { state: gameData, dispatch } = useGameContext();
  const { word: answer, isLoading: isGettingWord } = useRandomWord();
  const [isCheckingWord, setIsCheckingWord] = useState<boolean>(false);
  const [shakeRow, setShakeRow] = useState<number | null>(null);
  const [toastVisible, setToastVisible] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string>('message');

  useGameInputHandler(
    isGettingWord,
    isCheckingWord,
    setIsCheckingWord,
    setShakeRow,
    setToastMessage,
    setToastVisible
  );

  useEffect(() => {
    dispatch({ type: 'set-answer', payload: { answer: answer.toLowerCase() } });
  }, [answer, dispatch]);

  return (
    <div className={styles['game-container']}>
      <Toast message={toastMessage} visible={toastVisible} />
      {isGettingWord && <Loader message="Getting a word" />}
      {gameData.rows.map((row, i) => (
        <Row
          key={i}
          boxStatuses={row.statuses}
          letters={row.letters}
          shouldShake={shakeRow === i}
        />
      ))}
      <Keyboard />
    </div>
  );
}

export default Game;
