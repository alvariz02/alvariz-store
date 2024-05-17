import Link from "next/link";
import styles from "./Register.module.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      setError("");
      const form = event.target as HTMLFormElement;
      const data = {
        email: form.email.value,
        fullname: form.fullname.value,
        phone: form.phone.value,
        password: form.password.value,
      };
      const result = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (result.ok) {
        form.reset();
        setIsLoading(false);
        push("/auth/login");
      } else {
        const errorData = await result.json();
        throw new Error(errorData.message || "Failed to register user");
      }
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message || "Failed to register user");
    }
  };

  // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setIsLoading(true);
  //   setError("");
  //   const form = event.target as HTMLFormElement;
  //   const data = {
  //     email: form.email.value,
  //     fullname: form.fullname.value,
  //     phone: form.phone.value,
  //     password: form.password.value,
  //   };
  //   const result = await fetch("/api/user/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   if (result.status === 200) {
  //     form.reset();
  //     setIsLoading(false);
  //     push("/auth/login");
  //   } else {
  //     setIsLoading(false);
  //     setError("Email is already registered");
  //   }
  // };
  return (
    <>
      <div className={styles.register}>
        <h1 className={styles.register__title}>Register</h1>
        {error && <p className={styles.register__error}>{error}</p>}
        <div className={styles.register__form}>
          <form onSubmit={handleSubmit}>
            <Input label="Fullname" name="fullname" type="text"></Input>
            <Input label="Email" name="email" type="email"></Input>
            <Input label="Phone" name="phone" type="text"></Input>
            <Input label="Password" name="password" type="password"></Input>
            <Button type="submit" variant="primary" className={styles.register__form__button}>
              {isLoading ? "Loading.." : "Register"}
            </Button>
          </form>
        </div>
        <p className={styles.register__link}>
          Have an account? Sign in <Link href="/auth/login">here</Link>
        </p>
      </div>
    </>
  );
};

export default RegisterView;
