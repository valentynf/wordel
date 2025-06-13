import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react';
import { checkIfRealWord } from '../api/wordsApi';
import { useGameContext } from './useGameContext';

function useGameInputHandler(
  isGettingWord: boolean,
  isCheckingWord: boolean,
  setIsCheckingWord: Dispatch<SetStateAction<boolean>>
) {
  const { state: gameData, dispatch } = useGameContext();
  const { rows, currentRow } = gameData;
  const isGettingWordRef = useRef(isGettingWord);
  // const [isCheckingWord, setIsCheckingWord] = useState<boolean>(false);

  useEffect(() => {
    isGettingWordRef.current = isGettingWord;
  }, [isGettingWord]);

  useEffect(() => {
    const handleInput = async (input: string): Promise<void> => {
      if (isGettingWordRef.current || isCheckingWord) return;
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
  }, [currentRow, dispatch, rows, isCheckingWord, setIsCheckingWord]);
}

export default useGameInputHandler;
