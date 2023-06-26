import { playfairDisplay } from "@/styles/fonts"
import { PortfolioContext } from "@/utils/Context"
import { useContext } from "react"
import styled from "styled-components"
import ThemeButton from "./interactivity/ThemeButton"
import ContactCTA from "./interactivity/ContactCTA"
import ContactMenu from "./ContactMenu"

const StyledFrame = styled.div`
  position: fixed;
  height: calc(100dvh - 2rem);
  width: calc(100% - 2rem);
  z-index: 9;
  overflow: hidden;
  border: 2px solid ${props => props.theme.main};
  box-sizing: border-box;
  top: 0;
  color: ${props => props.theme.main};
  margin: 1rem;
  padding: 1rem;
  pointer-events: none;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  outline: 10rem solid ${props => props.theme.background};
  &.reduced {
    height: calc(90lvh - 2rem - 4px);
  }
`

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const StyledLogo = styled.div`
  font-size: 5rem;
  pointer-events: all;
  cursor: pointer;
`

const StyledNav = styled.nav`
  font-size: 2rem;
  pointer-events: all;
`

const StyledNavLinkList = styled.ul`
  display: flex;
  gap: 2rem;
`

const StyledNavLink = styled.li`
  cursor: pointer;
`

const StyledFooter = styled.footer`
`

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`

export default function Frame() {
  const { setContactMenuIsOpened, aboutSectionRef, workSectionRef } = useContext(PortfolioContext);

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
              <StyledNavLink onClick={handleAboutLinkClick}>
                about
              </StyledNavLink>
              <StyledNavLink onClick={handleWorkLinkClick}>
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