
import { useState, useMemo } from "react";

const useMousePosition = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const bind = useMemo(
    () => ({
      onMouseMove: (event) => {
        setX((event.clientX / window.innerWidth));
        setY((event.clientY / window.innerHeight));
      }
    }),
    []
  );

  return [x, y, bind];
};

export default useMousePosition;