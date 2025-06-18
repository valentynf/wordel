import styles from './KeyboardKey.module.css';

type KeyboardKeyProps = {
  keyValue: string;
};

function KeyboardKey({ keyValue }: KeyboardKeyProps) {
  return <div className={styles['key-container']}>{keyValue}</div>;
}

export default KeyboardKey;
