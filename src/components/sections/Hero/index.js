import { styled } from "styled-components"
import { useContext } from "react";
import { PortfolioContext } from "@/utils/Context";
import { playfairDisplaySC } from "@/styles/fonts";

const StyledHero = styled.section`
  height: 100lvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 1s;
  mix-blend-mode: ${props => props.theme.blendmode};
`

const StyledCaptionsContainer = styled.div`
  
`

const StyledMainCaption = styled.div`
  position: relative;
  top: 0;
  /* isolation: isolate; */
  & h1 {
    font-size: 10vw;
    letter-spacing: 2vw;
  }
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: ${props => props.theme.main};
    margin-left: auto;
    width: 50%;
    height: 90%;
    object-position: bottom right;
    mix-blend-mode: difference;
  }
`

const StyledDescriptionContainer = styled.div`
  padding-left: 1rem;
  font-size: 1.5rem;
  line-height: 2rem;
  letter-spacing: 0.75vw;
  width: 100%;
`

export default function Hero() {
  return (
    <>
      <StyledHero >
        <StyledCaptionsContainer>
          <StyledMainCaption className={playfairDisplaySC.className}>
            <h1>Hello There</h1>
          </StyledMainCaption>
          <StyledDescriptionContainer>
            <h3>Je m'appelle Andry</h3>
            <h3>Je suis développeur web</h3>
            <h3>Bienvenue sur mon portfolio</h3>
            </StyledDescriptionContainer>
        </StyledCaptionsContainer>
      </StyledHero>
    </>
  )
}