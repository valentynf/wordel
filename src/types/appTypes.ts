export type View = 'start' | 'game' | 'end';
export type BoxStatus = 'correct' | 'present' | 'default' | 'wrong';
export type RowType = {
  letters: string[];
  statuses: BoxStatus[];
};
export type GameState = {
  hasWon: boolean;
  answer: string;
  view: View;
  rows: RowType[];
  currentRow: number;
};
export type GameStateReducerAction =
  | {
      type: 'add-letter';
      payload: { letter: string };
    }
  | {
      type: 'next-row';
    }
  | {
      type: 'remove-letter';
    }
  | {
      type: 'set-view';
      payload: { view: View };
    }
  | {
      type: 'submit-guess';
    }
  | {
      type: 'try-again';
    };
