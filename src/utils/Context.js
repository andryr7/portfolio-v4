import { createContext, useState, useRef, useEffect } from "react";

export const PortfolioContext = createContext();

export const PortfolioProvider = (({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAltLang, setIsAltLang] = useState(false);
  const [contactMenuIsOpened, setContactMenuIsOpened] = useState(false);
  const [projectPageIsOpened, setProjectPageIsOpened] = useState(false);
  const aboutSectionRef = useRef(null);
  const workSectionRef = useRef(null);

  // Switching to english if the navigator language isn't french
  // useEffect(()=>{
  //   window.navigator.language !== 'fr' && setIsAltLang(true);
  // },[]);

  // Handling animation disabling on mobile
  // useEffect(() => {
  //   window.innerWidth <= 768 && setIsMobile(true);
  //   const handleResize = () => {
  //     if (window.innerWidth <= 768 && isMobile === false) {
  //       setIsMobile(true);
  //     }
  //     else {
  //       setIsMobile(false);
  //     }
  //   };
    
  //   window.addEventListener('resize', handleResize);

  //   return (() => window.removeEventListener('resize', handleResize))
  // }, [isMobile])

  return (
    <PortfolioContext.Provider value={{
      isDarkMode,
      setIsDarkMode,
      contactMenuIsOpened,
      setContactMenuIsOpened,
      isAltLang,
      setIsAltLang,
      aboutSectionRef,
      workSectionRef,
      projectPageIsOpened,
      setProjectPageIsOpened
    }}>
      {children}
    </PortfolioContext.Provider>
  )
})