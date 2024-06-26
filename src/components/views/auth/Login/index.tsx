import styles from "./Login.module.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layouts/AuthLayout";
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
    <AuthLayout title="Login" link="/auth/register" error={error} linkText="don't have an account? Sign up">
      <form onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="email"></Input>
        <Input label="Password" name="password" type="password"></Input>
        <Button type="submit" variant="primary" className={styles.login__button}>
          {isLoading ? "Loading.." : "Login"}
        </Button>
      </form>
      <hr className={styles.login__devider} />
      <div className={styles.login__other}>
        <Button type="submit" className={styles.login__other__button} onClick={() => signIn("google", { callbackUrl, redirect: false })}>
          {" "}
          <i className="bx bxl-google" />
          Login With Google
        </Button>
      </div>
    </AuthLayout>
  );
};

export default LoginView;
