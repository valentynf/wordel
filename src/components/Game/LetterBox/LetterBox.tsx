import type { BoxStatus } from '../Game';
import styles from './LetterBox.module.css';

type LetterBoxProps = {
  letter: string;
  status: BoxStatus;
};

function LetterBox({ letter, status }: LetterBoxProps) {
  return (
    <>
      <div className={`${styles['letterbox-container']} ${styles[status]}`}>
        <p className={styles['letter']}>{letter.toUpperCase()}</p>
      </div>
    </>
  );
}

export default LetterBox;
