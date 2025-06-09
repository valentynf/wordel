import { useEffect, useState } from 'react';
import { checkIfRealWord } from '../api/wordsApi';

function useRealityCheck(guess: string) {
  const [isRealWord, setIsRealWord] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const checkWord = async (word: string) => {
      try {
        const isReal = await checkIfRealWord(word);
        setIsRealWord(!!isReal);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    checkWord(guess);
  }, [guess]);

  return { isRealWord, isLoading };
}

export default useRealityCheck;
