import styles from './LetterBox.module.css';

type LetterBoxProps = {
  letter: string;
};

function LetterBox({ letter }: LetterBoxProps) {
  return (
    <>
      <div className={styles['letterbox-container']}>
        <p className={styles['letter']}>{letter.toUpperCase()}</p>
      </div>
    </>
  );
}

export default LetterBox;
// This component renders a letterbox styled div using CSS modules.
