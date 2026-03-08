import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description: string;
  badge?: string;
}

export function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-10 md:mb-14"
    >
      {badge && (
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3">
          {badge}
        </span>
      )}
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground text-balance leading-tight">
        {title}
      </h1>
      <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
        {description}
      </p>
      <div className="mt-6 h-px bg-border" />
    </motion.div>
  );
}
