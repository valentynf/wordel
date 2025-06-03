import styles from './Row.module.css';
import LetterBox from '../LetterBox/LetterBox.tsx';

type RowProps = {
  wordInput: string;
};

function Row({ wordInput }: RowProps) {
  return (
    <div className={styles['row-container']}>
      {wordInput
        .padEnd(5)
        .split('')
        .map((letter, i) => (
          <LetterBox key={i} letter={letter} />
        ))}
    </div>
  );
}

export default Row;
