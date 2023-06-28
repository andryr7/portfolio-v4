import { styled, useTheme } from "styled-components"
import { useContext } from "react";
import { PortfolioContext } from "@/utils/Context";
import { playfairDisplaySC } from "@/styles/fonts";

const StyledHeroSection = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 1s;
  position: fixed;
  top: 0;
  z-index: -1;
`

const StyledBackground = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
`

const StyledCaptionsContainer = styled.div`
  width: 100%;
`

const StyledMainCaption = styled.div`
  font-size: 10vw;
  letter-spacing: 3vw;
  display: flex;
  width: 100%;
`

const MainCaptionFirstPart = styled.h1`
  display: block;
  flex-grow: 1;
`

const MainCaptionSecondPart = styled.h1`
  display: block;
  flex-grow: 1;
  position: relative;
  mix-blend-mode: overlay;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: ${props => props.theme.main};
    margin-left: auto;
    width: 100%;
    height: 51%;
    mix-blend-mode: exclusion;
  }
`

const StyledDescriptionContainer = styled.div`
  padding-left: 1rem;
  font-size: 2rem;
  line-height: 2rem;
  letter-spacing: 0.5rem;
  width: 100%;
`

export default function Hero() {
  const { heroSectionRef, isDarkMode, backgroundShift } = useContext(PortfolioContext);
  const theme = useTheme();

  const darkBackgroundStyle = {
    background:`
      radial-gradient(circle at -10% 75%, 
        ${theme.background} 0%, 
        ${theme.background} ${30 + (backgroundShift * 80)}%, 
        ${theme.red} ${45 + (backgroundShift * 65)}%, 
        ${theme.orange} ${50 + (backgroundShift * 60)}%, 
        ${theme.main} ${55 + (backgroundShift * 55)}%, 
        ${theme.blue} ${65 + (backgroundShift * 45)}%, 
        ${theme.background} ${95 + (backgroundShift * 15)}%, 
        ${theme.background} 100%
      )
    `,
  };

  const lightBackgroundStyle = {
    background:`
      radial-gradient(circle at -10% 75%, 
        ${theme.background} 0%, 
        ${theme.background} ${30 + (backgroundShift * 90)}%, 
        #FEE7A7 ${45 + (backgroundShift * 100)}%, 
        #F6B98A ${50 + (backgroundShift * 110)}%, 
        ${theme.background} ${55 + (backgroundShift * 120)}%, 
        #90BCF9 ${65 + (backgroundShift * 130)}%, 
        ${theme.background} ${95 + (backgroundShift * 140)}%, 
        ${theme.background} 100%
      )
    `,
  };
  
  return (
    <StyledHeroSection ref={heroSectionRef}>
      <StyledBackground style={isDarkMode ? darkBackgroundStyle : lightBackgroundStyle}/>
      <StyledCaptionsContainer>
        <StyledMainCaption className={playfairDisplaySC.className}>
          <MainCaptionFirstPart >
            Hello
          </MainCaptionFirstPart>
          <MainCaptionSecondPart>
            World
          </MainCaptionSecondPart>
        </StyledMainCaption>
        <StyledDescriptionContainer>
          <h3>Je m&apos;appelle Andry</h3>
          <h3>Je suis développeur web</h3>
          <h3>Bienvenue sur mon portfolio</h3>
          </StyledDescriptionContainer>
      </StyledCaptionsContainer>
    </StyledHeroSection>
  )
}