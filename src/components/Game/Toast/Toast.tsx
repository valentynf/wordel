import styles from './Toast.module.css';

type ToastProps = {
  message: string;
  visible: boolean;
};

function Toast({ message, visible }: ToastProps) {
  return (
    <div
      className={`${styles['toast-container']} ${
        visible ? styles['visible'] : ''
      }`}
    >
      {message}
    </div>
  );
}

export default Toast;
