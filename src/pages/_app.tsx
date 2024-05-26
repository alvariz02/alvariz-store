import Navbar from "@/components/fargments/Navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Lato } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const disableNavbar = ["auth", "admin"];
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const { pathname } = router;
  return (
    <SessionProvider session={session}>
      <Head>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet"></link>
      </Head>
      <div className={lato.className}>
        {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar></Navbar>}

        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
