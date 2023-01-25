import "../styles/globals.css";
import image from "../images/2.svg";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";

const MyApp = ({ Component, pageProps, router }) => {
  return (
    <AnimatePresence mode="wait">
      <Head>
        <title>Foode</title>
        <link rel="icon" href={image.src} />
      </Head>
      <motion.div
        key={router.route}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  );
};

export default MyApp;
