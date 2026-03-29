// AnimatedDropdownDiv.jsx
import { motion } from "framer-motion";
import { forwardRef } from "react";

const AnimatedDropdownDiv = forwardRef(({ children, className }, ref) => {
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.05 }}
        >
            {children}
        </motion.div>
    );
});

export default AnimatedDropdownDiv;