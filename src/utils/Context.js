import { createContext, useState, useRef, useEffect } from "react";

export const PortfolioContext = createContext();

export const PortfolioProvider = (({children}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAltLang, setIsAltLang] = useState(false);
  const [contactMenuIsOpened, setContactMenuIsOpened] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [aboutSectionScroll, setAboutSectionScroll] = useState(0);
  const [workSectionScroll, setWorkSectionScroll] = useState(0);
  const aboutSectionRef = useRef(null);
  const workSectionRef = useRef(null);

  // Switching to english if the navigator language isn't french
  useEffect(()=>{
    window.navigator.language !== 'fr' && setIsAltLang(true);
  },[]);

  // Handling animation disabling on mobile
  useEffect(() => {
    window.innerWidth <= 768 && setIsMobile(true);
    const handleResize = () => {
      if (window.innerWidth <= 768 && isMobile === false) {
        setIsMobile(true);
      }
      else {
        setIsMobile(false);
      }
    };
    
    window.addEventListener('resize', handleResize);

    return (() => window.removeEventListener('resize', handleResize))
  }, [isMobile])

  return (
    <PortfolioContext.Provider value={{ 
      isMobile,
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
      aboutSectionScroll,
      setAboutSectionScroll,
      workSectionScroll,
      setWorkSectionScroll
    }}>
      {children}
    </PortfolioContext.Provider>
  )
})