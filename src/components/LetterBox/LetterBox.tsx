import type { BoxStatus } from '../Game/Game';
import styles from './LetterBox.module.css';

type LetterBoxProps = {
  letter: string;
  status: BoxStatus;
};

function LetterBox({ letter, status }: LetterBoxProps) {
  return (
    <>
      <div className={`${styles['letterbox-container']} ${styles[status]}`}>
        {/* <div className={styles['letterbox-container']}> */}
        <p className={styles['letter']}>{letter.toUpperCase()}</p>
      </div>
    </>
  );
}

export default LetterBox;
// This component renders a letterbox styled div using CSS modules.
