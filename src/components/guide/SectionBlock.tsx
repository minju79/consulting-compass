import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionBlockProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function SectionBlock({ id, title, description, children }: SectionBlockProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className="mb-14"
    >
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2 tracking-tight">{title}</h2>
      {description && (
        <p className="text-muted-foreground text-sm md:text-base mb-5 max-w-2xl">{description}</p>
      )}
      <div>{children}</div>
    </motion.section>
  );
}
