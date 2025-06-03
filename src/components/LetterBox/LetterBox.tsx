import styles from './LetterBox.module.css';

type LetterBoxProps = {
  currentLetter: string;
};

function LetterBox({ currentLetter }: LetterBoxProps) {
  return (
    <>
      <div className={styles['letterbox-container']}>
        <p className={styles['letter']}>{currentLetter.toUpperCase()}</p>
      </div>
    </>
  );
}

export default LetterBox;
// This component renders a letterbox styled div using CSS modules.
