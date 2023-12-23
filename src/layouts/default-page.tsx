import Head from "next/head";
import {type ReactNode} from "react";

interface DefaultPageProps {
  children: ReactNode
  title: string
}
export default function DefaultPage({ children, title = "Dashboard" }: DefaultPageProps) {
  return (
    <>
      <Head>
        <title>{title} | Goober</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="flex min-h-screen flex-col items-center justify-stretch">
        {children}
      </main>
    </>
  );
}
