import { createContext, type Dispatch } from 'react';
import type {
  BoxStatus,
  GameState,
  GameStateReducerAction,
} from '../types/appTypes';

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

export function reducer(
  prevState: GameState,
  action: GameStateReducerAction
): GameState {
  switch (action.type) {
    case 'add-letter': {
      const { letter } = action.payload;
      const { currentRow, rows } = prevState;

      if (rows[currentRow].letters.length >= 5) return prevState;

      return {
        ...prevState,
        rows: rows.map((row, i) =>
          i === currentRow ? { ...row, letters: [...row.letters, letter] } : row
        ),
      };
    }

    case 'remove-letter': {
      const { currentRow, rows } = prevState;

      if (rows[currentRow].letters.length < 1) return prevState;

      return {
        ...prevState,
        rows: rows.map((row, i) =>
          i === currentRow
            ? {
                ...row,
                letters: row.letters.slice(0, row.letters.length - 1),
              }
            : row
        ),
      };
    }

    case 'submit-guess': {
      const { currentRow, rows, answer } = prevState;
      const lettersAnswer: string[] = answer.split('');
      const lettersGuess: string[] = rows[currentRow].letters;
      const isRightGuess: boolean = answer === lettersGuess.join('');
      const boxStatuses: BoxStatus[] = Array(5).fill('wrong');
      const lettersRecord: Record<string, number> = {};
      const updatedLetterStatuses = { ...prevState.letterStatuses };
      lettersAnswer.forEach((char) => {
        lettersRecord[char] = (lettersRecord[char] || 0) + 1;
      });

      lettersGuess.forEach((char, i) => {
        if (char === lettersAnswer[i]) {
          boxStatuses[i] = 'correct';
          lettersRecord[char]--;
        }
      });

      lettersGuess.forEach((char, i) => {
        if (boxStatuses[i] !== 'correct' && lettersRecord[char] > 0) {
          boxStatuses[i] = 'present';
          lettersRecord[char]--;
        }
      });

      lettersGuess.forEach((letter, i) => {
        const currentStatus = updatedLetterStatuses[letter];
        const newStatus = boxStatuses[i];

        const rank: { [key in BoxStatus]: number } = {
          default: 0,
          highlighted: 0,
          wrong: 1,
          present: 2,
          correct: 3,
        };

        if (!currentStatus || rank[newStatus] > rank[currentStatus]) {
          updatedLetterStatuses[letter] = newStatus;
        }
      });

      return {
        ...prevState,
        currentRow: currentRow < 5 ? currentRow + 1 : currentRow,
        hasWon: isRightGuess ? true : false,
        rows: rows.map((row, i) =>
          i === currentRow ? { ...row, statuses: boxStatuses } : row
        ),
        letterStatuses: updatedLetterStatuses,
      };
    }

    case 'set-view':
      return { ...prevState, view: action.payload.view };

    case 'try-again':
      return { ...initialState, view: 'game' };

    case 'set-answer': {
      const { answer } = action.payload;
      return { ...prevState, answer: answer };
    }

    default:
      return prevState;
  }
}

const GameContext = createContext<
  { state: GameState; dispatch: Dispatch<GameStateReducerAction> } | undefined
>(undefined);

export default GameContext;
