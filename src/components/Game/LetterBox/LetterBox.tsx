import type { BoxStatus } from '../../../types/appTypes';
import styles from './LetterBox.module.css';

type LetterBoxProps = {
  letter: string;
  status: BoxStatus;
  flipped: boolean;
  flipDelay: number;
};

function LetterBox({ letter, status, flipped, flipDelay }: LetterBoxProps) {
  return (
    <div className={`${styles['letterbox-container']}`}>
      <div
        className={`${styles['letterbox-inner']} ${
          flipped ? styles['flipped'] : ''
        }`}
        style={{ '--delay': `${flipDelay}s` } as React.CSSProperties}
      >
        <div
          className={`${styles['letterbox-front']} ${
            styles[letter === ' ' ? 'default' : 'highlighted']
          }`}
        >
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
