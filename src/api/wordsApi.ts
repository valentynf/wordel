import { GET_WORD_API_KEY, GET_WORD_API_URL } from '../config';

export const fetchRandomWord = async (): Promise<string | undefined> => {
  try {
    const response = await fetch(
      `${GET_WORD_API_URL}&api_key=${GET_WORD_API_KEY}`
    );
    const data = await response.json();
    return data.word;
  } catch (err) {
    console.error(`Couldn't fetch a random word`, err);
    throw err;
  }
};
