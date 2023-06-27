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
  const [currentSection, setCurrentSection] = useState('hero');
  
  useEffect(() => {
    if(heroSectionRef.current === 'null' || aboutSectionRef.current === 'null' || workSectionRef.current === 'null') {
      return
    };

    const getCurrentSection = () =>  {
      const aboutSectionTop = aboutSectionRef.current.getBoundingClientRect().top;
      const workSectionTop = workSectionRef.current.getBoundingClientRect().top;

      if (aboutSectionTop > (window.innerHeight / 2)) {
        setCurrentSection('hero');
      }
      else {
        if(Math.abs(aboutSectionTop) < Math.abs(workSectionTop)) {
          setCurrentSection('about');
        }
        else {
          setCurrentSection('work')
        }
      }
    }

    document.addEventListener('scroll', getCurrentSection);

    return (() => {
      document.removeEventListener('scroll', getCurrentSection);
    })
  },[])

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
      workSectionRef,
      currentSection
    }}>
      {children}
    </PortfolioContext.Provider>
  )
})