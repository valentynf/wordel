import { createContext, type Dispatch } from 'react';
import type {
  BoxStatus,
  GameState,
  GameStateReducerAction,
} from '../types/appTypes';

export const initialState: GameState = {
  hasWon: false, // do you really need this?
  answer: 'SHARK',
  view: 'start',
  rows: Array(6)
    .fill(0)
    .map(() => ({
      letters: [],
      statuses: Array(5).fill('default' as BoxStatus),
    })),
  currentRow: 0,
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

    // omit checking word in dictinary if it's a right guess!!!
    case 'submit-guess': {
      const { currentRow, rows, answer } = prevState;
      const lettersAnswer = answer.split('');
      const lettersGuess = rows[currentRow].letters;
      // console.log('Guess:', lettersGuess.join(''));
      // console.log('Answer:', answer);

      // if (answer.toUpperCase() === lettersGuess.join('').toUpperCase()) {
      //   console.log('in if!');
      //   return {
      //     ...prevState,
      //     hasWon: true,
      //     view: 'end',
      //     rows: rows.map((row, i) =>
      //       i === currentRow
      //         ? { ...row, statuses: Array(5).fill('correct' as BoxStatus) }
      //         : row
      //     ),
      //   };
      // }
      const boxStatuses: BoxStatus[] = lettersGuess
        .map((letter) =>
          answer.toUpperCase().includes(letter.toUpperCase())
            ? 'present'
            : 'wrong'
        )
        .map((status, i) =>
          lettersGuess[i].toUpperCase() === lettersAnswer[i].toUpperCase()
            ? 'correct'
            : status
        );
      const isRightAnswer: boolean = boxStatuses.every(
        (status) => status === 'correct'
      );

      return {
        ...prevState,
        hasWon: isRightAnswer ? true : false,
        view: currentRow === 5 || isRightAnswer ? 'end' : prevState.view,
        rows: rows.map((row, i) =>
          i === currentRow ? { ...row, statuses: boxStatuses } : row
        ),
      };
    }

    case 'next-row':
      return { ...prevState, currentRow: prevState.currentRow + 1 };

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
