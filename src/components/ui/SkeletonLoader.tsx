import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  count?: number;
}

// Yeh Skeleton component premium loading state dikhane ke liye hai
export function Skeleton({ className, count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className={`bg-white/5 rounded-xl ${className}`}
        />
      ))}
    </>
  );
}

// Specific skeleton layouts for repos and resources
export function RepoCardSkeleton() {
  return (
    <div className="p-6 rounded-[2rem] bg-slate-900/40 border border-white/5 space-y-4">
      <div className="flex justify-between">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <Skeleton className="w-20 h-6" />
      </div>
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-3/4 h-4" />
      <div className="flex gap-4 pt-4 mt-auto">
        <Skeleton className="w-12 h-4" />
        <Skeleton className="w-12 h-4" />
        <Skeleton className="w-16 h-4 ml-auto" />
      </div>
    </div>
  );
}

export function ResourceCardSkeleton() {
  return (
    <div className="p-6 rounded-[2rem] bg-slate-900/40 border border-white/5 space-y-6">
      <div className="flex justify-between">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <Skeleton className="w-24 h-6 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-4" />
      </div>
      <div className="flex justify-between pt-4 border-t border-white/5">
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-24 h-8" />
      </div>
    </div>
  );
}
