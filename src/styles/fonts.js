import { Playfair_Display, Playfair_Display_SC } from 'next/font/google';
 
export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
});
 
export const playfairDisplaySC = Playfair_Display_SC({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});