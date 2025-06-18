import type { BoxStatus } from '../../../../types/appTypes';
import styles from './KeyboardKey.module.css';

type KeyboardKeyProps = {
  keyValue: string;
  status: BoxStatus;
};

function KeyboardKey({ keyValue, status }: KeyboardKeyProps) {
  const handleClick = () => {
    const event = new KeyboardEvent('keydown', {
      key: keyValue === '⌫' ? 'Backspace' : keyValue,
      bubbles: true,
    });
    window.dispatchEvent(event);
  };
  return (
    <button
      onClick={handleClick}
      className={`${styles['key-container']} ${
        keyValue === 'Enter' || keyValue === '⌫' ? styles['phat'] : ''
      } ${styles[`${status}`]}`}
    >
      {keyValue.toUpperCase()}
    </button>
  );
}

export default KeyboardKey;
