// // PageTransition.tsx
// import { motion, AnimatePresence } from "framer-motion";
// import { useLocation } from "react-router-dom";

// interface PageTransitionProps {
//   children: React.ReactNode;
// }

// const PageTransition = ({ children }: PageTransitionProps) => {
//   const location = useLocation();

//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         key={location.pathname} // important!
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -10 }}
//         transition={{ duration: 0.6, ease: "easeInOut" }}
//         style={{ position: "relative" }}
//       >
//         {children}
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default PageTransition;

//Without scroll to top animation
// import { motion } from "framer-motion";

// interface PageTransitionProps {
//   children: React.ReactNode;
// }

// const PageTransition = ({ children }: PageTransitionProps) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -10 }}
//       transition={{ duration: 0.4, ease: "easeInOut" }} // slow enough
//       style={{ position: "relative" }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// export default PageTransition;

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ position: "relative", width: "100%" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
