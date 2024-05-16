import Link from "next/link";
import styles from "./Login.module.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (!res?.error) {
        form.reset();
        push(callbackUrl);
      } else {
        throw new Error("Email or password is incorrect");
      }
    } catch (error: any) {
      setError(error.message || "Email or password is incorrect");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.login}>
        <h1 className={styles.login__title}>Login</h1>
        {error && <p className={styles.login__error}>{error}</p>}
        <div className={styles.login__form}>
          <form onSubmit={handleSubmit}>
            <div className={styles.login__form__item}>
              <label htmlFor="email">Email</label>
              <input name="email" id="email" type="email" className={styles.login__form__item__input} />
            </div>
            <div className={styles.login__form__item}>
              <label htmlFor="password">Password</label>
              <input name="password" id="password" type="password" className={styles.login__form__item__input} />
            </div>
            <button type="submit" className={styles.login__form__button}>
              {isLoading ? "Loading.." : "Login"}
            </button>
          </form>
          <hr className={styles.login__form__devider} />
          <div className={styles.login__form__other}>
            <button type="button" onClick={() => signIn("google", { callbackUrl, redirect: false })} className={styles.login__form__other__button}>
              <i className="bx bxl-google" />
              Login With Google
            </button>
          </div>
        </div>

        <p className={styles.login__link}>
          don{"'"}t have an account? Sign up <Link href="/auth/register">here</Link>
        </p>
      </div>
    </>
  );
};

export default LoginView;
