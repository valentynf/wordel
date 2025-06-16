import type { BoxStatus } from '../../../types/appTypes';
import styles from './LetterBox.module.css';

type LetterBoxProps = {
  letter: string;
  status: BoxStatus;
  flipped: boolean;
};

function LetterBox({ letter, status, flipped }: LetterBoxProps) {
  return (
    <div className={`${styles['letterbox-container']}`}>
      <div
        className={`${styles['letterbox-inner']} ${
          flipped ? styles['flipped'] : ''
        }`}
      >
        <div className={`${styles['letterbox-front']} ${styles['default']}`}>
          {letter.toUpperCase()}
        </div>
        <div className={`${styles['letterbox-back']} ${styles[status]}`}>
          {letter.toUpperCase()}
        </div>
      </div>
    </div>
  );
}

export default LetterBox;
