"use client";

import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps extends MotionProps {
  className?: string;
  children: React.ReactNode;
}

export function AnimatedSection({ className, children, ...rest }: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("scroll-mt-24", className)}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
