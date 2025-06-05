import { useReducer, type ReactNode } from 'react';
import type {
  BoxStatus,
  GameState,
  GameStateReducerAction,
} from '../types/appTypes';
import GameContext from './GameContext';

const answer = 'SHARK';

const initialState: GameState = {
  view: 'start',
  rows: Array(6)
    .fill(0)
    .map(() => ({
      letters: [],
      statuses: Array(5).fill('default' as BoxStatus),
    })),
  currentRow: 0,
};

function reducer(
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
      const { currentRow, rows } = prevState;
      const lettersAnswer = answer.split('');
      const lettersGuess = rows[currentRow].letters;

      const boxStatuses: BoxStatus[] = lettersGuess
        .map((letter) =>
          answer.includes(letter.toUpperCase()) ? 'present' : 'wrong'
        )
        .map((status, i) =>
          lettersGuess[i].toUpperCase() === lettersAnswer[i].toUpperCase()
            ? 'correct'
            : status
        );

      return {
        ...prevState,
        rows: rows.map((row, i) =>
          i === currentRow ? { ...row, statuses: boxStatuses } : row
        ),
      };
    }

    case 'next-row':
      return { ...prevState, currentRow: prevState.currentRow + 1 };

    case 'set-view':
      return { ...prevState, view: action.payload.view };

    default:
      return prevState;
  }
}

function GameContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
