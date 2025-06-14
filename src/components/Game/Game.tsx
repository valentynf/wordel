import { useEffect, useState } from 'react';
import styles from './Game.module.css';
import Row from './Row/Row';
import { useGameContext } from '../../hooks/useGameContext';
import useRandomWord from '../../hooks/useRandomWord';
import useGameInputHandler from '../../hooks/useGameInputHandler';
import Loader from './Loader/Loader';

function Game() {
  const { state: gameData, dispatch } = useGameContext();
  const { word: answer, isLoading: isGettingWord } = useRandomWord();
  const [isCheckingWord, setIsCheckingWord] = useState<boolean>(false);

  useGameInputHandler(isGettingWord, isCheckingWord, setIsCheckingWord);

  useEffect(() => {
    dispatch({ type: 'set-answer', payload: { answer: answer.toLowerCase() } });
  }, [answer, dispatch]);

  return (
    <div className={styles['game-container']}>
      {isGettingWord && <Loader message="Getting a word" />}
      {gameData.rows.map((row, i) => (
        <Row key={i} boxStatuses={row.statuses} letters={row.letters} />
      ))}
    </div>
  );
}

export default Game;
