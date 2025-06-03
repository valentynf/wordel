import styles from './Row.module.css';
import LetterBox from '../LetterBox/LetterBox.tsx';

function Row() {
  return (
    <div className={styles['row-container']}>
      <LetterBox currentLetter="s" />
      <LetterBox currentLetter="h" />
      <LetterBox currentLetter="a" />
      <LetterBox currentLetter="k" />
      <LetterBox currentLetter="e" />
    </div>
  );
}

export default Row;
