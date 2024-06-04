import styles from './Input.module.css';
import { useForm } from 'react-hook-form';

interface Props {
  name: string;
  label?: string;
  type?: string;
  placeholder: string;
  register: any;
  errors: any;
}

function Input({ name, label, type = 'text', placeholder, register, errors }: Props) {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input className={styles.input} id={name} type={type} placeholder={placeholder} {...register(name)} />
      {errors[name] && <span className={styles.error}>{errors[name]?.message}</span>}
    </div>
  );
}

export default Input;
