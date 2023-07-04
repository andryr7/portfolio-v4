import { createContext, useState, useRef } from "react";

export const PortfolioContext = createContext();

export const PortfolioProvider = (({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAltLang, setIsAltLang] = useState(false);
  const [contactMenuIsOpened, setContactMenuIsOpened] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const aboutSectionRef = useRef(null);
  const workSectionRef = useRef(null);

  // Checking navigator language and saving theme and language preferences
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
      setCurrentSection,
      isAltLang,
      setIsAltLang,
      currentSection,
      aboutSectionRef,
      workSectionRef,
    }}>
      {children}
    </PortfolioContext.Provider>
  )
})