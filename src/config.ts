import type { BoxStatus, GameState } from './types/appTypes';

export const GET_WORD_API_URL =
  'https://api.wordnik.com/v4/words.json/randomWord?minLength=5&maxLength=5&hasDictionaryDef=true&includePartOfSpeech=noun,verb,adjective&excludePartOfSpeech=proper-noun,proper-noun-plural,proper-noun-posessive,family-name,given-name&minDictionaryCount=1';

export const initialState: GameState = {
  hasWon: false,
  answer: 'shark',
  view: 'start',
  rows: Array(6)
    .fill(0)
    .map(() => ({
      letters: [],
      statuses: Array(5).fill('default' as BoxStatus),
    })),
  currentRow: 0,
  letterStatuses: Object.fromEntries(
    'abcdefghijklmnopqrstuvwxyz'.split('').map((l) => [l, 'default'])
  ),
};
