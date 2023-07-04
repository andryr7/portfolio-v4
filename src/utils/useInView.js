import { useEffect, useState } from 'react';

const useInView = (ref, {once = false, threshold = 0, rootMargin = '0px'}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const targetElement = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (once) {
          entry.isIntersecting && setIsIntersecting(true);
        }
        else {
          setIsIntersecting(entry.isIntersecting)
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, [once, ref, threshold, rootMargin]);

  return isIntersecting;
};

export default useInView;