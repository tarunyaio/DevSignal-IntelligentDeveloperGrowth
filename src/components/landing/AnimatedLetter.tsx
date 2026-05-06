import { motion, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { useScroll } from 'framer-motion';

interface AnimatedLetterProps {
  text: string;
  className?: string;
}

export function AnimatedLetter({ text, className }: AnimatedLetterProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end 0.2'],
  });

  const chars = text.split('');

  return (
    <span ref={containerRef} className={className}>
      {chars.map((char, i) => (
        <Char 
          key={i} 
          char={char} 
          index={i} 
          total={chars.length} 
          progress={scrollYProgress} 
        />
      ))}
    </span>
  );
}

function Char({ char, index, total, progress }: { char: string, index: number, total: number, progress: MotionValue<number> }) {
  const charProgress = index / total;
  const opacity = useTransform(
    progress,
    [Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)],
    [0.2, 1]
  );

  return (
    <motion.span style={{ opacity }}>
      {char}
    </motion.span>
  );
}
