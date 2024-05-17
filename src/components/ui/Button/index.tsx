import styles from "./Button.module.scss";
type proptypes = {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: string;
  className?: string;
};
const Button = (props: proptypes) => {
  const { type, onClick, children, variant = "primary", className } = props;
  return (
    <button type={type} onClick={onClick} className={`${styles.button} ${styles[variant]} ${className}`}>
      {/* <i className="bx bxl-google" />
      Login With Google */}
      {children}
    </button>
  );
};
export default Button;
