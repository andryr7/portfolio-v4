import { styled, keyframes, useTheme } from "styled-components"
import { useContext } from "react"
import { PortfolioContext } from "@/utils/Context"
import { playfairDisplaySC } from "@/styles/fonts"

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

const StyledHeaderPart = styled.div`
  position: relative;
  & h3 {
    margin-right: -3vw;
    font-size: 10vw;
    letter-spacing: 3vw;
    @media (max-width: 768px) {
      font-size: 20vw;
      letter-spacing: 3vw;
    };
  }
`

const StyledCaptions = styled.div`
pointer-events: all;
  display: flex;
  flex-direction: column;
  font-size: clamp(1rem, 1vw, 2rem);
  line-height: clamp(1.5rem, 1.5vw, 3rem);
  letter-spacing: 0.5vw;
  position: absolute;
  top: 100%;
  left: clamp(3rem, 3vw, 5rem);
  width: 50%;
  @media (max-width: 768px) {
    margin-top: 1rem;
    position: static;
    flex-direction: column;
    align-items: center;
    width: 100%;
  };
`

export default function Hero() {
  const { heroSectionRef, isDarkMode, backgroundShift } = useContext(PortfolioContext);

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
        <StyledHeaderPart>
          <h3 className='interactive'>World</h3>
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