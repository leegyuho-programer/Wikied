import styles from './Input.module.css';
import { useForm } from 'react-hook-form';

interface InputProps {
  name: string;
  label?: string;
  type?: string;
}

function Input({ name, label, type = 'text' }): InputProps {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input className={styles.input} id={name} type={type} />
      {/* {errors && <span className={styles.error}>error</span>} */}
    </div>
  );
}

export default Input;
