import { playfairDisplay } from "@/styles/fonts"
import { PortfolioContext } from "@/utils/Context"
import { useContext } from "react"
import styled from "styled-components"
import ThemeButton from "./interactivity/ThemeButton"
import ContactCTA from "./interactivity/ContactCTA"
import ContactMenu from "./ContactMenu"

const StyledFrame = styled.div`
  position: fixed;
  height: calc(100lvh - 2rem - 4px);
  width: calc(100% - 2rem - 4px);
  z-index: 9;
  border: 2px solid ${props => props.theme.main};
  box-sizing: border-box;
  top: 0;
  color: ${props => props.theme.main};
  margin: 1rem;
  padding: 1rem;
  pointer-events: none;
  mix-blend-mode: normal;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
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
`

const StyledFooter = styled.footer``

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`

export default function Frame() {
  const { contactMenuIsOpened } = useContext(PortfolioContext);
  
  return (
    <>
      <StyledFrame className={`${playfairDisplay.className} ${contactMenuIsOpened && 'reduced'}`}>
        <StyledHeader>
          <StyledLogo>
            AR
          </StyledLogo>
          <StyledNav>
            <StyledNavLinkList>
              <StyledNavLink>
                about
              </StyledNavLink>
              <StyledNavLink>
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
      </StyledFrame>
      <ContactMenu />
    </>
  )
}