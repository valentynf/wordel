import { keyboardRows } from '../../../config';
import { useGameContext } from '../../../hooks/useGameContext';
import type { RowKey } from '../../../types/appTypes';
import styles from './Keyboard.module.css';
import KeyboardKey from './KeyboardKey/KeyboardKey';

function Keyboard() {
  const { state: gameData } = useGameContext();
  const rowKeys: RowKey[] = ['row1', 'row2', 'row3'];

  return (
    <div className={styles['keyboard-container']}>
      {rowKeys.map((rowKey, i) => (
        <div key={i} className={styles[`keyboard-${rowKey}`]}>
          {keyboardRows[rowKey].map((key, j) => (
            <KeyboardKey
              key={j}
              keyValue={key}
              status={gameData.letterStatuses[key.toLowerCase()]}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
