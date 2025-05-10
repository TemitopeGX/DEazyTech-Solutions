import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import RootLayout from "@/components/layouts/RootLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
      <Toaster position="bottom-right" />
    </RootLayout>
  );
}
