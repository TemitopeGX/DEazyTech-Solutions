import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "@/components/layout/Layout";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps, router }: AppProps) {
  const isAdminPage = router.pathname.startsWith("/admin");

  const PageContent = () => (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <Component {...pageProps} key={router.pathname} />
    </AnimatePresence>
  );

  return (
    <>
      {isAdminPage ? (
        <PageContent />
      ) : (
        <Layout>
          <PageContent />
        </Layout>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Toaster position="top-right" />
    </>
  );
}
