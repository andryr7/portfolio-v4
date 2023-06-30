import { useLenis } from "@studio-freight/react-lenis";
import { useState } from "react"

export default function useScroll(element) {
  const [scroll, setScroll] = useState(0);
  useLenis(() => {
    const elementRect = element.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const min = elementRect.height + windowHeight;
    const indicator = ( elementRect.bottom - min ) / (windowHeight - min);
    const clampedIndicator = Math.min(Math.max(indicator, 0), 1);
    setScroll(clampedIndicator);
  })

  return scroll
}