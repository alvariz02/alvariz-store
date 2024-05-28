import styles from "./Input.module.scss";
type Proptype = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disabeld?: boolean;
};
const Input = (props: Proptype) => {
  const { label, name, type, placeholder, defaultValue, disabeld } = props;
  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <input name={name} id={name} type={type} placeholder={placeholder} className={styles.container__input} defaultValue={defaultValue} disabled={disabeld} />
    </div>
  );
};
export default Input;
