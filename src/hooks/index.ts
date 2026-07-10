"use client";
import { useState, useEffect, useCallback } from "react";

export function useIntersection(
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(ref);
      }
    }, options);
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);

  return { ref: setRef, isVisible };
}

export function useCountUp(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let rafId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start]);

  return value;
}

export function useCarousel(totalSlides: number, autoPlayInterval = 5000) {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (index: number) => setCurrent(((index % totalSlides) + totalSlides) % totalSlides),
    [totalSlides]
  );
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [next, autoPlayInterval]);

  return { current, goTo, next, prev };
}
