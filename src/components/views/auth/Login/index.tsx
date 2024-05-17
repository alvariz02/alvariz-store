import Link from "next/link";
import styles from "./Login.module.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
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
            <Input label="Email" name="email" type="email"></Input>
            <Input label="Password" name="password" type="password"></Input>
            <Button type="submit" variant="primary" className={styles.login__form__button}>
              {isLoading ? "Loading.." : "Login"}
            </Button>
          </form>
          <hr className={styles.login__form__devider} />
          <div className={styles.login__form__other}>
            <Button type="submit" className={styles.login__form__other__button} onClick={() => signIn("google", { callbackUrl, redirect: false })}>
              {" "}
              <i className="bx bxl-google" />
              Login With Google
            </Button>
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
