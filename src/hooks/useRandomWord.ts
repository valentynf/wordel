import { useEffect, useState } from 'react';
import { fetchRandomWord } from '../api/wordsApi';

function useRandomWord() {
  const [word, setWord] = useState<string>('');
  useEffect(() => {
    const fetchWord = async () => {
      try {
        const randomWord = await fetchRandomWord();
        if (randomWord) {
          setWord(randomWord);
        }
      } catch (err) {
        console.error('Could not fetch a word', err);
      }
    };
    fetchWord();
  }, []);

  return { word };
}

export default useRandomWord;
