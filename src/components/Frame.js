import { playfairDisplay } from "@/styles/fonts"
import { PortfolioContext } from "@/utils/Context"
import { useContext } from "react"
import styled from "styled-components"
import ThemeButton from "./interactivity/ThemeButton"
import ContactCTA from "./interactivity/ContactCTA"
import ContactMenu from "./ContactMenu"

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
  padding: max(1vw, 1rem);
  pointer-events: none;
  transition: all 0.5s;
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
  font-size: clamp(2.5rem, 10vw, 5rem);
  pointer-events: all;
  cursor: pointer;
`

const StyledNav = styled.nav`
  pointer-events: all;
`

const StyledNavLinkList = styled.ul`
  display: flex;
  gap: clamp(1rem, 2vw, 3rem);
`

const StyledNavLink = styled.li`
  font-size: clamp(1.5rem, 2vw, 2rem);
  cursor: pointer;
  transition: all 0.5s;
  &.current {
    color: ${props => props.theme.orange};
  }
`

const StyledFooter = styled.footer`
`

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`

export default function Frame() {
  const { setContactMenuIsOpened, aboutSectionRef, workSectionRef, currentSection } = useContext(PortfolioContext);

  const handleAboutLinkClick = () => {
    aboutSectionRef.current.scrollIntoView();
    setContactMenuIsOpened(false);
  };
  
  const handleWorkLinkClick = () => {
    workSectionRef.current.scrollIntoView();
    setContactMenuIsOpened(false);
  };

  const handleHomeLinkClick = () => {
    window.scrollTo(0,0);
    setContactMenuIsOpened(false);
  };
  
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
            <ThemeButton />
            <ContactCTA />
          </StyledButtonContainer>
        </StyledFooter>
        <ContactMenu />
      </StyledFrame>
    </>
  )
}