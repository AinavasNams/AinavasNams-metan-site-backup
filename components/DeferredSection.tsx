'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';

/**
 * Defers mounting of children until the element is near the viewport
 * AND the browser is idle. Prevents main-thread blocking when navigating
 * back to a page with many heavy components.
 */
export default function DeferredSection({
  children,
  fallback,
  rootMargin = '200px',
}: {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          // Use requestIdleCallback to avoid blocking main thread
          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => setMounted(true), { timeout: 300 });
          } else {
            setTimeout(() => setMounted(true), 50);
          }
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {mounted ? children : (fallback || <div style={{ minHeight: '200px' }} />)}
    </div>
  );
}
