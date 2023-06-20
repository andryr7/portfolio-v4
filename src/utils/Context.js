import { createContext, useState, useEffect, useRef } from "react";

export const PortfolioContext = createContext();

export const PortfolioProvider = (({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [contactMenuIsOpened, setContactMenuIsOpened] = useState(false);
  const [backgroundShift, setBackgroundShift] = useState(0);
  const aboutSectionRef = useRef(null);
  const workSectionRef = useRef(null);

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
      aboutSectionRef,
      workSectionRef
    }}>
      {children}
    </PortfolioContext.Provider>
  )
})