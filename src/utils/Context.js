import { createContext, useState, useEffect, useRef } from "react";
import { useScrollProgress } from "./useScrollProgress";

export const PortfolioContext = createContext();

export const PortfolioProvider = (({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [contactMenuIsOpened, setContactMenuIsOpened] = useState(false);
  const [backgroundShift, setBackgroundShift] = useState(0);
  const heroSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const workSectionRef = useRef(null);
  // const heroSectionProgress = useScrollProgress(heroSectionRef);

  //Checking navigator language and saving theme and language preferences
  // useEffect(()=>{
  //   localStorage.getItem('lang') === 'en' && setLanguage('en');
  //   window.navigator.language === 'en' && setLanguage('en') && localStorage.setItem('lang', 'en');
  //   localStorage.getItem('theme') === 'light' && setTheme('light');
  // },[]);

  return (
    <PortfolioContext.Provider value={{ 
      isDarkMode,
      setIsDarkMode,
      contactMenuIsOpened,
      setContactMenuIsOpened,
      backgroundShift,
      setBackgroundShift,
      heroSectionRef,
      aboutSectionRef,
      workSectionRef
    }}>
      {children}
    </PortfolioContext.Provider>
  )
})