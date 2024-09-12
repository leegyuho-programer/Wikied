import classNames from 'classnames/bind';
import styles from './Input.module.css';

interface Props {
  name: string;
  label?: string;
  type?: string;
  placeholder: string;
  register?: any;
  errors?: any;
  onChange?: any;
  classname?: any;
}

const cn = classNames.bind(styles);

function Input({ name, label, type = 'text', placeholder, register, errors, classname }: Props) {
  return (
    <div className={cn(styles.container, classname)}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input className={styles.input} id={name} type={type} placeholder={placeholder} {...register} />
      {errors[name] && <span className={styles.error}>{errors[name]?.message}</span>}
    </div>
  );
}

export default Input;
