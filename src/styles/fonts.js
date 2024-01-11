import { Playfair_Display, Playfair_Display_SC, Lato } from "next/font/google";

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export const playfairDisplaySC = Playfair_Display_SC({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const lato = Lato({
  weight: ["400"],
  subsets: ["latin"],
});
