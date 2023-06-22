import { useState, useEffect } from "react";

export const useScrollProgress = (ref) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: buildThresholdList(20),
    };

    const observer = new IntersectionObserver(handleScroll, options);
    const target = ref.current;
    observer.observe(target);

    function buildThresholdList(stepNb) {
      const thresholds = [];
      const numSteps = stepNb;

      for (let i = 1; i <= numSteps; i++) {
        const ratio = i / numSteps;
        thresholds.push(ratio);
      }

      thresholds.push(0);
      return thresholds;
    }

    function handleScroll(entries, observer) {

      entries.forEach((entry) => {
        const { intersectionRatio } = entry;
        // console.log(entry)

        if (intersectionRatio > progress) {
          setProgress(intersectionRatio);
        }
      });
    }

    return () => {
      observer.unobserve(target);
    };
  }, [progress, ref]);

  return progress;
};