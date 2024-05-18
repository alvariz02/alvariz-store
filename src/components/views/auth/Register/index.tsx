import Link from "next/link";
import styles from "./Register.module.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";
const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const form = event.target as HTMLFormElement;
      const data = {
        email: form.email.value,
        fullname: form.fullname.value,
        phone: form.phone.value,
        password: form.password.value,
      };

      const result = await authServices.registerAccount(data); // Pastikan ini adalah panggilan axios

      if (result.status === 200) {
        form.reset();
        setIsLoading(false);
        push("/auth/login");
      } else {
        const errorData = result.data;
        throw new Error(errorData.message || "Failed to register user");
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(error.message || "Failed to register user");
      }
    }
  };
  // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   try {
  //     event.preventDefault();
  //     setIsLoading(true);
  //     setError("");
  //     const form = event.target as HTMLFormElement;
  //     const data = {
  //       email: form.email.value,
  //       fullname: form.fullname.value,
  //       phone: form.phone.value,
  //       password: form.password.value,
  //     };
  //     const result = await authServices.registerAccount(data);// ini dari axios

  //     if (result.ok) {
  //       form.reset();
  //       setIsLoading(false);
  //       push("/auth/login");
  //     } else {
  //       const errorData = await result.json();
  //       throw new Error(errorData.message || "Failed to register user");
  //     }
  //   } catch (error: any) {
  //     setIsLoading(false);
  //     setError(error.message || "Failed to register user");
  //   }
  // };

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
    <AuthLayout title="Register" error={error} link="/auth/login" linkText="Have an account? Sign in ">
      <form onSubmit={handleSubmit}>
        <Input label="Fullname" name="fullname" type="text"></Input>
        <Input label="Email" name="email" type="email"></Input>
        <Input label="Phone" name="phone" type="text"></Input>
        <Input label="Password" name="password" type="password"></Input>
        <Button type="submit" variant="primary" className={styles.register__button}>
          {isLoading ? "Loading.." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
