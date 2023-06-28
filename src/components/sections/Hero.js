import { styled, keyframes, useTheme } from "styled-components"
import { useContext } from "react"
import { PortfolioContext } from "@/utils/Context"
import { playfairDisplaySC } from "@/styles/fonts"

import { Lenis as ReactLenis, useLenis } from '@studio-freight/react-lenis'

const StyledHeroSection = styled.section`
  height: 100vh;
  width: calc(100% - 2vw - 4px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: -1;
  top: 0;
  background-color: ${props => props.theme.background};
`

const StyledBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`

const StyledFirstCircle = styled.div`
  height: 55vw;
  @media (max-width: 768px) {
    height: 100vw;
  };
  aspect-ratio: 1;
  position: absolute;
  top: 50%;
  left: 33.33%;
  border-radius: 50% 50% 50% 50%;
  mix-blend-mode: ${props => props.theme.blendmode};
  background: 
    linear-gradient(180deg, #9f260077, rgba(217,217,217,0) 61%);
`

const StyledSecondCircle = styled.div`
  height: 55vw;
  @media (max-width: 768px) {
    height: 100vw;
  };
  aspect-ratio: 1;
  position: absolute;
  top: 50%;
  left: 66.66%;
  border-radius: 50% 50% 50% 50%;
  mix-blend-mode: ${props => props.theme.blendmode};
  background: 
    linear-gradient(0deg, #2a3d6377, rgba(217,217,217,0) 61%);
`

const StyledHeroContainer = styled.header`
  display: flex;
  justify-content: space-around;
  width: 100%;
  z-index: 1;
  position: relative;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  };
`


const StyledFirstWord = styled.h3`
  transition: transform 0.25s;
`

const StyledSecondWord = styled.h3`
  position: absolute;
  transition: transform 0.25s;
`

const StyledHeaderPart = styled.div`
  position: relative;
  margin-right: -3vw;
  font-size: 10vw;
  letter-spacing: 3vw;
  overflow: hidden;
  @media (max-width: 768px) {
    font-size: 20vw;
    letter-spacing: 3vw;
  }
  &.interactive:hover {
  @media (min-width: 768px) {
    ${StyledFirstWord} {
      transform: translateY(-100%);
    }
    ${StyledSecondWord} {
      transform: translateY(-100%);
    }
  };
  }
`

const StyledCaptions = styled.div`
  display: flex;
  flex-direction: column;
  font-size: clamp(1rem, 1.5vw, 2rem);
  line-height: clamp(1.5rem, 2vw, 3rem);
  letter-spacing: 0.5vw;
  position: absolute;
  top: 100%;
  left: clamp(3rem, 3vw, 5rem);
  width: 50%;
  @media (max-width: 768px) {
    margin-top: 0.5rem;
    position: static;
    flex-direction: column;
    align-items: center;
    width: 100%;
  };
`

export default function Hero() {
  const { heroSectionRef, backgroundShift } = useContext(PortfolioContext);

  const firstCircleStyle = {
    transform: `translate(${-50 + backgroundShift * 50}%, -50%)`
  }

  const secondCircleStyle = {
    transform: `translate(${-50 - backgroundShift * 50}%, -50%)`
  }
  
  return (
    <StyledHeroSection ref={heroSectionRef}>
      <StyledBackground>
        <StyledFirstCircle style={firstCircleStyle}/>
        <StyledSecondCircle style={secondCircleStyle}/>
      </StyledBackground>
      <StyledHeroContainer className={playfairDisplaySC.className}>
        <StyledHeaderPart>
          <h3>Hello</h3>
        </StyledHeaderPart>
        <StyledHeaderPart className="interactive">
          <StyledFirstWord>World</StyledFirstWord>
          <StyledSecondWord>There</StyledSecondWord>
        </StyledHeaderPart>
        <StyledCaptions>
          <span>Je m&apos;appelle Andry</span>
          <span>Je suis développeur web</span>
          <span>Bienvenue sur mon portfolio</span>
        </StyledCaptions>
      </StyledHeroContainer>
    </StyledHeroSection>
  )
}