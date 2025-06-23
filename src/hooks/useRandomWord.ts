import { useEffect, useState } from 'react';
import { fetchRandomWord } from '../api/wordsApi';

function useRandomWord(shouldFetchWord: boolean) {
  const [word, setWord] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!shouldFetchWord) {
      setIsLoading(false);
      return;
    }
    const fetchWord = async () => {
      try {
        const randomWord = await fetchRandomWord();
        if (randomWord) {
          setWord(randomWord);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWord();
  }, [shouldFetchWord]);

  return { word, isLoading };
}

export default useRandomWord;
