import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react';
import { checkIfRealWord } from '../api/wordsApi';
import { useGameContext } from './useGameContext';

function useGameInputHandler(
  isGettingWord: boolean,
  isCheckingWord: boolean,
  setIsCheckingWord: Dispatch<SetStateAction<boolean>>,
  setShakeRow: Dispatch<SetStateAction<number | null>>,
  setToastMessage: Dispatch<SetStateAction<string>>,
  setToastVisible: Dispatch<SetStateAction<boolean>>
) {
  const { state: gameData, dispatch } = useGameContext();
  const { rows, currentRow, answer } = gameData;
  const isGettingWordRef = useRef(isGettingWord);

  useEffect(() => {
    isGettingWordRef.current = isGettingWord;
  }, [isGettingWord]);

  useEffect(() => {
    const handleInput = async (input: string): Promise<void> => {
      if (isGettingWordRef.current || isCheckingWord) return; //no input if checking or getting a word
      const currentGuess = rows[currentRow].letters.join('');
      const shakeRow = (rowNumber: number) => {
        setShakeRow(rowNumber);
        setTimeout(() => setShakeRow(null), 500);
      };
      function showToast(message: string) {
        setToastMessage(message);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 1000);
      }

      if (input === 'Enter' && currentGuess.length < 5) {
        shakeRow(currentRow);
        showToast('Not enough letters');
        return;
      }

      if (input === 'Enter' && currentGuess.length === 5) {
        if (currentGuess.toLowerCase() === answer.toLowerCase()) {
          dispatch({ type: 'submit-guess' });
          setTimeout(() => {
            dispatch({ type: 'set-view', payload: { view: 'end' } });
          }, 2400);
          return;
        }

        try {
          setIsCheckingWord(true);
          const isReal = await checkIfRealWord(currentGuess);
          if (!isReal) {
            shakeRow(currentRow);
            showToast('Not in word list');
            return;
          }
          dispatch({ type: 'submit-guess' });
          if (currentRow === 5) {
            setTimeout(() => {
              dispatch({ type: 'set-view', payload: { view: 'end' } });
            }, 2400);
          }
        } catch (err) {
          console.log(err);
        } finally {
          setIsCheckingWord(false);
        }
      }
      if (/^[A-Z]$/i.test(input))
        dispatch({
          type: 'add-letter',
          payload: { letter: input.toLowerCase() },
        });
      if (input === 'Backspace') dispatch({ type: 'remove-letter' });
    };
    const handleKeyDown = (e: KeyboardEvent) => handleInput(e.key);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    currentRow,
    dispatch,
    rows,
    isCheckingWord,
    setIsCheckingWord,
    answer,
    setShakeRow,
    setToastMessage,
    setToastVisible,
  ]);
}

export default useGameInputHandler;
