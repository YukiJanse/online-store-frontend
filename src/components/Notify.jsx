import styles from './Notify.module.css';

export default function Notify({ message, visible }) {
  return (
    <div className={`${styles.notify} ${visible ? styles.show : ''}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}
