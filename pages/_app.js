import "../styles/globals.css";
import { motion, AnimatePresence } from "framer-motion";

const MyApp = ({ Component, pageProps, router }) => {
  return (
    <AnimatePresence mode="wait">
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
