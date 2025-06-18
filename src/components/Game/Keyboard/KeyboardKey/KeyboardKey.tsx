import styles from './KeyboardKey.module.css';

type KeyboardKeyProps = {
  keyValue: string;
};

function KeyboardKey({ keyValue }: KeyboardKeyProps) {
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
      }`}
    >
      {keyValue.toUpperCase()}
    </button>
  );
}

export default KeyboardKey;
