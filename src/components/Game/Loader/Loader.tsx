import { ColorRing } from 'react-loader-spinner';
import styles from './Loader.module.css';

type LoaderProps = {
  message: string;
};

function Loader({ message }: LoaderProps) {
  return (
    <div className={styles['loader-container']}>
      <div className={styles['loader']}>
        <ColorRing
          height="80"
          width="80"
          colors={['#c0c0c0', '#4a4a4a', '#c0c0c0', '#4a4a4a', '#c0c0c0']}
        />
        <span className={styles['loader-message']}>{message}</span>
      </div>
    </div>
  );
}

export default Loader;
