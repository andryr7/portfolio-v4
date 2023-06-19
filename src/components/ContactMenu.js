import { PortfolioContext } from "@/utils/Context"
import { useContext } from "react"
import { styled } from "styled-components"
import { playfairDisplay } from "@/styles/fonts"
import EmailIcon from "./Interactivity/emailIcon"
import GitHubIcon from "./Interactivity/githubIcon"
import LinkedInIcon from "./Interactivity/linkedinIcon"


const StyledContactMenu = styled.div`
  position: fixed;
  bottom: -1rem;
  transition: all 0.5s;
  width: calc(100% - 4px - 2rem);
  height: calc(10lvh - 1rem);
  z-index: 9;
  box-sizing: border-box;
  margin: 1rem;
  transform: translateY(100%);
  border: 2px solid ${props => props.theme.main};
  display: flex;
  &.opened {
    transform: translateY(0%);
    bottom: 0;
  }
`

const StyledMainLinkCaption = styled.div`
  transition: transform 0.5s;
  transform: translateY(50%);
`

const StyledSecondaryLinkCaption = styled.div`
  opacity: 0;
  transition: opacity 0.5s;
`

const StyledContactSection = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: ${props => props.theme.main};
  cursor: pointer;
  transition: all 0.5s;
  font-size: 1.5rem;
  flex-direction: column;
  gap: 0rem;
  &:not(:last-of-type) {
    &::after {
      background-color: ${props => props.theme.main};
      width: 2px;
      height: 110%;;
      content: '';
      position: absolute;
      right: 0;
      transform: translateX(50%) rotate(-22.5deg);
    }
  }
  &:hover {
    flex-grow: 2.5;
    gap: 0.5rem;
    & ${StyledMainLinkCaption} {
      transform: translateY(0);
    }
    & ${StyledSecondaryLinkCaption} {
      opacity: 1;
    }
  }
`

export default function ContactMenu() {
  const { contactMenuIsOpened } = useContext(PortfolioContext);

  return(
    <StyledContactMenu className={`${contactMenuIsOpened && 'opened'} ${playfairDisplay.className}`}>
      <StyledContactSection >
        <StyledMainLinkCaption>
          GitHub
        </StyledMainLinkCaption>
        <StyledSecondaryLinkCaption>
          Retrouvez mes projets
        </StyledSecondaryLinkCaption>
      </StyledContactSection>
      <StyledContactSection >
        <StyledMainLinkCaption>
          LinkedIn
        </StyledMainLinkCaption>
        <StyledSecondaryLinkCaption>
          Retrouvez mes expériences professionnelles
        </StyledSecondaryLinkCaption>
      </StyledContactSection>
      <StyledContactSection >
        <StyledMainLinkCaption>
          Email
        </StyledMainLinkCaption>
        <StyledSecondaryLinkCaption>
          Contactez moi directement
        </StyledSecondaryLinkCaption>
      </StyledContactSection>
    </StyledContactMenu>
  )
}