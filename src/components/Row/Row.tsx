import styles from './Row.module.css';
import LetterBox from '../LetterBox/LetterBox.tsx';
import type { BoxStatus } from '../Game/Game.tsx';

type RowProps = {
  wordInput: string;
  boxesStatus: BoxStatus[];
};

function Row({ wordInput, boxesStatus }: RowProps) {
  return (
    <div className={styles['row-container']}>
      {wordInput
        .padEnd(5)
        .split('')
        .map((letter, i) => (
          <LetterBox key={i} letter={letter} status={boxesStatus[i]} />
        ))}
    </div>
  );
}

export default Row;
