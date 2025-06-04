import styles from './Row.module.css';
import LetterBox from '../LetterBox/LetterBox.tsx';
import type { BoxStatus } from '../Game.tsx';

type RowProps = {
  letters: string[];
  boxStatuses: BoxStatus[];
};

function Row({ letters, boxStatuses }: RowProps) {
  return (
    <div className={styles['row-container']}>
      {letters
        .join('')
        .padEnd(5)
        .split('')
        .map((letter, i) => (
          <LetterBox key={i} letter={letter} status={boxStatuses[i]} />
        ))}
    </div>
  );
}

export default Row;
