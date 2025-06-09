import { GET_WORD_API_URL } from '../config';

const apiKey = import.meta.env.VITE_GET_WORD_API_KEY;

export const fetchRandomWord = async (): Promise<string | undefined> => {
  try {
    const response = await fetch(`${GET_WORD_API_URL}&api_key=${apiKey}`);
    const data = await response.json();
    return data.word;
  } catch (err) {
    console.error(`Couldn't fetch a random word`, err);
    throw err;
  }
};
