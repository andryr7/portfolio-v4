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
`

const StyledCaptionsContainer = styled.div`
  width: 100%;
`

const StyledMainCaption = styled.div`
  /* isolation: isolate; */
  font-size: 10vw;
  letter-spacing: 3vw;
  display: flex;
  justify-content: center;
  width: 100%;
`

const MainCaptionFirstPart = styled.h1`
  display: block;
`

const MainCaptionSecondPart = styled.h1`
  display: block;
  position: relative;
  mix-blend-mode: overlay;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: ${props => props.theme.main};
    margin-left: auto;
    width: 95%;
    height: 51%;
    mix-blend-mode: exclusion;
  }
`

const StyledDescriptionContainer = styled.div`
  padding-left: 1rem;
  font-size: 1.5rem;
  line-height: 2rem;
  letter-spacing: 0.5rem;
  width: 100%;
`

export default function Hero() {
  return (
    <>
      <StyledHero >
        <StyledCaptionsContainer>
          <StyledMainCaption className={playfairDisplaySC.className}>
            <MainCaptionFirstPart>
              Hello
            </MainCaptionFirstPart>
            <MainCaptionSecondPart>
              World
            </MainCaptionSecondPart>
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