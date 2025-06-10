import { useEffect, useState } from 'react';
import styles from './Game.module.css';
import Row from './Row/Row';
import { useGameContext } from '../../hooks/useGameContext';
import useRandomWord from '../../hooks/useRandomWord';
import { checkIfRealWord } from '../../api/wordsApi';

function Game() {
  const { state: gameData, dispatch } = useGameContext();
  const { rows, currentRow } = gameData;
  const { word: answer, isLoading: isGettingWord } = useRandomWord();
  const [isCheckingWord, setIsCheckingWord] = useState<boolean>(false);

  useEffect(() => {
    dispatch({ type: 'set-answer', payload: { answer: answer } });
  }, [answer, dispatch]);

  useEffect(() => {
    const handleInput = async (input: string) => {
      if (isGettingWord || isCheckingWord) return;
      const currentGuess = rows[currentRow].letters.join('');
      if (input === 'Enter' && currentGuess.length === 5) {
        try {
          setIsCheckingWord(true);
          const isReal = await checkIfRealWord(currentGuess);
          if (!isReal) return;
          dispatch({ type: 'submit-guess' });
          if (currentRow < 5) dispatch({ type: 'next-row' });
        } catch (err) {
          console.log(err);
        } finally {
          setIsCheckingWord(false);
        }
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
  }, [currentRow, dispatch, rows, isCheckingWord, isGettingWord]);

  return (
    <div className={styles['game-container']}>
      {gameData.rows.map((row, i) => (
        <Row key={i} boxStatuses={row.statuses} letters={row.letters} />
      ))}
    </div>
  );
}

export default Game;
