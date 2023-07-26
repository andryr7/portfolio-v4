import { playfairDisplay } from "@/styles/fonts"
import { PortfolioContext } from "@/utils/Context"
import { useCallback, useContext } from "react"
import styled from "styled-components"
import { useLenis } from "@studio-freight/react-lenis"
import ThemeButton from "./interactivity/ThemeButton"
import ContactCTA from "./interactivity/ContactCTA"
import LangButton from "./interactivity/LangButton"

const StyledFrame = styled.div`
  position: fixed;
  height: calc(100dvh - 2vw);
  width: calc(100% - 2vw);
  z-index: 9;
  border: 2px solid ${props => props.theme.main};
  box-sizing: border-box;
  top: 0;
  color: ${props => props.theme.main};
  margin: 1vw;
  padding: max(1vw, 0.5rem);
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  outline: 10rem solid ${props => props.theme.background};
  overflow: hidden;
`

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const StyledLogo = styled.div`
  display: flex;
  font-size: clamp(2rem, 10vw, 4.5rem);
  pointer-events: all;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    text-shadow: 3px 3px ${props => props.theme.accent}
  }
`

const StyledNav = styled.nav`
  pointer-events: all;
`

const StyledNavLinkList = styled.ul`
  display: flex;
  gap: clamp(1rem, 2vw, 3rem);
`

const StyledNavLink = styled.li`
  font-size: clamp(1.25rem, 1.75vw, 2rem);
  cursor: pointer;
  transition: all 0.5s;
  position: relative;
  &.current {
    &::before {
      opacity: 1;
    }
    &::after {
      opacity: 0;
    }
  }
  &::before {
    content: '. ';
    opacity: 0;
    position: absolute;
    left: -0.5rem;
    transition: opacity 0.5s;
    color: ${props => props.theme.accent}
  }
  &::after {
    content: '';
    position: absolute;
    transition: all 0.5s;
    top: 175%;
    right: 0;
    width: 0%;
    height: 2px;
    background-color: ${props => props.theme.accent};
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:hover::after {
    width: 100%;
    left: 0;
  }
`

const StyledFooter = styled.footer``

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`

const StyledSiteOptionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
`

export default function Frame({ currentSection }) {
  const { 
    contactMenuIsOpened, 
    setContactMenuIsOpened, 
    aboutSectionRef, 
    workSectionRef,
    isAltLang 
  } = useContext(PortfolioContext);
  
  const lenis = useLenis();

  const handleAboutLinkClick = useCallback(() => {
    if(contactMenuIsOpened) {
      lenis.start();
      setContactMenuIsOpened(false);
    }
    lenis.scrollTo(aboutSectionRef.current);
  },[contactMenuIsOpened, setContactMenuIsOpened, lenis, aboutSectionRef]);

  const handleWorkLinkClick = useCallback(() => {
    if(contactMenuIsOpened) {
      lenis.start();
      setContactMenuIsOpened(false);
    }
    lenis.scrollTo(workSectionRef.current);
  },[contactMenuIsOpened, setContactMenuIsOpened, lenis, workSectionRef]);

  const handleHomeLinkClick = useCallback(() => {
    if(contactMenuIsOpened) {
      lenis.start();
      setContactMenuIsOpened(false);
    }
    lenis.scrollTo(0);
  },[contactMenuIsOpened, setContactMenuIsOpened, lenis]);
  
  return (
    <>
      <StyledFrame className={`${playfairDisplay.className}`}>
        <StyledHeader>
          <StyledLogo onClick={handleHomeLinkClick}>
            AR
          </StyledLogo>
          <StyledNav>
            <StyledNavLinkList>
              <StyledNavLink onClick={handleAboutLinkClick} className={currentSection === 'about' && 'current'}>
                {isAltLang ? 'about' : 'à propos'}
              </StyledNavLink>
              <StyledNavLink onClick={handleWorkLinkClick} className={currentSection === 'work' && 'current'}>
                {isAltLang ? 'work' : 'projets'}
              </StyledNavLink>
            </StyledNavLinkList>
          </StyledNav>
        </StyledHeader>
        <StyledFooter>
          <StyledButtonContainer>
            <StyledSiteOptionsContainer>
              <LangButton />
              <ThemeButton />
            </StyledSiteOptionsContainer>
            <ContactCTA />
          </StyledButtonContainer>
        </StyledFooter>
      </StyledFrame>
    </>
  )
}