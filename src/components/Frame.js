import { playfairDisplay } from "@/styles/fonts"
import { PortfolioContext } from "@/utils/Context"
import { useContext } from "react"
import styled from "styled-components"
import ThemeButton from "./interactivity/ThemeButton"
import ContactCTA from "./interactivity/ContactCTA"
import ContactMenu from "./ContactMenu"
import { useLenis } from "@studio-freight/react-lenis"
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

const StyledFullName = styled.div`
  overflow: hidden;
  max-width: 0px;
  transition: all 1s;
`

const StyledLogo = styled.div`
  display: flex;
  font-size: clamp(2rem, 10vw, 4.5rem);
  pointer-events: all;
  cursor: pointer;
  line-height: 7vh;
  &:hover {
    ${StyledFullName} {
      max-width: 500px;
    }
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
  &.current {
    color: ${props => props.theme.accent};
  }
`

const StyledFooter = styled.footer`
`

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`

const StyledSiteOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export default function Frame({ infoData }) {
  const { contactMenuIsOpened, setContactMenuIsOpened, aboutSectionRef, workSectionRef, currentSection } = useContext(PortfolioContext);
  const lenis = useLenis();

  const handleAboutLinkClick = () => {
    if(contactMenuIsOpened) {
      lenis.start();
      setContactMenuIsOpened(false);
    }
    lenis.scrollTo(aboutSectionRef.current);
  };

  const handleWorkLinkClick = () => {
    if(contactMenuIsOpened) {
      lenis.start();
      setContactMenuIsOpened(false);
    }
    lenis.scrollTo(workSectionRef.current);
  };

  const handleHomeLinkClick = () => {
    if(contactMenuIsOpened) {
      lenis.start();
      setContactMenuIsOpened(false);
    }
    lenis.scrollTo(0);
  };
  
  return (
    <>
      <StyledFrame className={`${playfairDisplay.className}`}>
        <StyledHeader>
          <StyledLogo onClick={handleHomeLinkClick}>
            <div>A</div>
            <StyledFullName>ndry&nbsp;</StyledFullName>
            <div>R</div>
            <StyledFullName>atsimba</StyledFullName>
          </StyledLogo>
          <StyledNav>
            <StyledNavLinkList>
              <StyledNavLink onClick={handleAboutLinkClick} className={currentSection === 'about' && 'current'}>
                about
              </StyledNavLink>
              <StyledNavLink onClick={handleWorkLinkClick} className={currentSection === 'work' && 'current'}>
                work
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
        <ContactMenu infoData={infoData}/>
      </StyledFrame>
    </>
  )
}