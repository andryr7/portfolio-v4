import { playfairDisplay } from "@/styles/fonts"
import { PortfolioContext } from "@/utils/Context"
import { useContext } from "react"
import styled from "styled-components"
import ThemeButton from "./Interactivity/ThemeButton"
import ContactCTA from "./Interactivity/ContactCTA"
import LinkedInIcon from '../assets/linkedin.png'
import GitHubIcon from '../assets/github-mark-white.svg'
import EmailIcon from '../assets/email.png'

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

// const StyledContactMenu = styled.div`
//   border-top: 2px solid ${props => props.theme.main};
//   padding-top: 1rem;
//   pointer-events: all;
//   transition: transform 0.5s;
//   transform: translateY(0%);
//   &.opened {
//     transform: translateY(150%);
//   }
// `

const StyledContactMenu = styled.div`
  position: fixed;
  bottom: 0;
  transition: all 0.5s;
  width: calc(100% - 4px - 2rem);
  height: calc(10lvh - 1rem);
  z-index: 9;
  box-sizing: border-box;
  margin: 1rem;
  transform: translateY(100%);
  opacity: 0;
  &.opened {
    transform: translateY(0%);
    opacity: 1;
  }
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
      <StyledContactMenu className={`${contactMenuIsOpened && 'opened'}`}>
        test
      </StyledContactMenu>
    </>
  )
}