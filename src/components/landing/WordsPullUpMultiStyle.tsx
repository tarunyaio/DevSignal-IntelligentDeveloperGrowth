import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface TextSegment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  className?: string;
}

export function WordsPullUpMultiStyle({ segments, className }: WordsPullUpMultiStyleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
  };

  // Flatten segments into an array of { word, className }
  const words = segments.flatMap((segment) => 
    segment.text.split(' ').map((word) => ({
      word,
      className: segment.className,
    }))
  );

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={cn("inline-flex flex-wrap justify-center", className)}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={item}
          className={cn("mr-[0.25em] inline-block", w.className)}
        >
          {w.word}
        </motion.span>
      ))}
    </motion.div>
  );
}
