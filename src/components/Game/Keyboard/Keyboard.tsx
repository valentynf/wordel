import styles from './Keyboard.module.css';
import KeyboardKey from './KeyboardKey/KeyboardKey';

type Keyboard = {
  row1: string[];
  row2: string[];
  row3: string[];
};

const keyboardRows: Keyboard = {
  row1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  row2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  row3: ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
};

function Keyboard() {
  return (
    <div className={styles['keyboard-container']}>
      <div className={styles['keyboard-row1']}>
        {keyboardRows.row1.map((key, i) => (
          <KeyboardKey key={i} keyValue={key} />
        ))}
      </div>
      <div className={styles['keyboard-row2']}>
        {keyboardRows.row2.map((key, i) => (
          <KeyboardKey key={i + 10} keyValue={key} />
        ))}
      </div>
      <div className={styles['keyboard-row3']}>
        {keyboardRows.row1.map((key, i) => (
          <KeyboardKey key={i + 19} keyValue={key} />
        ))}
      </div>
    </div>
  );
}

export default Keyboard;
