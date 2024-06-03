import styles from './Input.module.css';
import { useForm } from 'react-hook-form';

interface Props {
  name: string;
  label?: string;
  type?: string;
  placeholder: string;
}

function Input({ name, label, type = 'text', placeholder }: Props) {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input className={styles.input} id={name} type={type} placeholder={placeholder} />
      {/* {errors && <span className={styles.error}>error</span>} */}
    </div>
  );
}

export default Input;
