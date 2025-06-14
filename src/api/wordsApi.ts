import { GET_WORD_API_URL } from '../config';
import { getCheckWordApiUrl } from '../helper';

const apiKey = import.meta.env.VITE_GET_WORD_API_KEY;

export const fetchRandomWord = async (): Promise<string | undefined> => {
  try {
    const response = await fetch(`${GET_WORD_API_URL}&api_key=${apiKey}`);
    const data = await response.json();
    return data.word;
  } catch (err) {
    console.error(`Could not fetch a random word`, err);
    throw err;
  }
};

export const checkIfRealWord = async (
  word: string
): Promise<boolean | undefined> => {
  try {
    const response = await fetch(
      `${getCheckWordApiUrl(word.toLowerCase())}&api_key=${apiKey}`
    );
    const data = await response.json();
    const isValid = !!data[0]?.word; //word property only exists if the word is on a dictionary
    return isValid ? true : false;
  } catch (err) {
    console.error(`Could not check the word`, err);
    throw err;
  }
};
