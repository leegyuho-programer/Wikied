import classNames from 'classnames/bind';
import styles from './Input.module.css';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

const cn = classNames.bind(styles);

interface Props {
  name: string;
  label?: string;
  type?: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  errors?: FieldErrors;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  classname?: string;
  readonly?: boolean;
}

function Input({ name, label, type = 'text', placeholder, register, errors, classname }: Props) {
  return (
    <div className={cn(styles.container, classname)}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input className={styles.input} id={name} type={type} placeholder={placeholder} {...register} />
      {errors && errors[name] && typeof errors[name]?.message === 'string' && (
        <span className={styles.error}>{errors[name]?.message}</span>
      )}
    </div>
  );
}

export default Input;
