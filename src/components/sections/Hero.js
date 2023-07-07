import { styled, useTheme } from "styled-components"
import { useContext, useRef } from "react"
import { PortfolioContext } from "@/utils/Context"
import { playfairDisplaySC } from "@/styles/fonts"
import noisefilter from '../../assets/noise.svg'
import ScrollButton from "../Interactivity/scrollButton"

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
`

const StyledBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`

const StyledFirstCircle = styled.div`
  height: max(75vh, 50vw);
  aspect-ratio: 1;
  position: absolute;
  top: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: 
    linear-gradient(180deg, ${props => props.theme.accent}, rgba(217,217,217,0) 50%);
  filter: blur(25px);
  mask-image: url(${noisefilter.src});
  -webkit-mask-image: url(${noisefilter.src});
  mask-size: 200px 200px;
  -webkit-mask-size: 200px 200px;
  left: 35%;
`

const StyledSecondCircle = styled.div`
  height: max(75vh, 50vw);
  aspect-ratio: 1;
  position: absolute;
  top: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: 
    linear-gradient(0deg, ${props => props.theme.altaccent}, rgba(217,217,217,0) 50%);
  filter: blur(25px);
  mask-image: url(${noisefilter.src});
  -webkit-mask-image: url(${noisefilter.src});
  mask-size: 200px 200px;
  -webkit-mask-size: 200px 200px;
  left: 65%;
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
  overflow: hidden;
  transition: opacity 0.5s;
  @media (max-width: 768px) {
    font-size: 20vw;
    letter-spacing: 3vw;
  }
  &.interactive:hover {
    cursor: help;
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
  font-size: clamp(1.1rem, 1.5vw, 2rem);
  line-height: clamp(1.5rem, 2vw, 3rem);
  letter-spacing: 0.35vw;
  position: absolute;
  top: 100%;
  left: clamp(1rem, 3.5vw, 5rem);
  width: 50%;
  @media (max-width: 768px) {
    margin-top: 0.5rem;
    position: static;
    flex-direction: column;
    align-items: center;
    width: 100%;
  };
`

const StyledIconContainer = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 0;
  transform: translateY(-3vw);
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Hero() {
  const { heroSectionRef, isAltLang, isMobile, aboutSectionScroll, workSectionScroll } = useContext(PortfolioContext);
  const helloThere = useRef(null);
  const theme = useTheme();

  const sectionStyle = {
    backgroundColor: `${theme.background}`
  }

  const backgroundStyle = {
    transform: `rotate(${workSectionScroll > 0 ? '180deg' : '0deg'})`
  };

  const firstCircleStyle = {
    left: `${Math.min((35 + 30 * aboutSectionScroll), 50)}%`,
    maskPosition: `${Math.max((100 - aboutSectionScroll * 100), 50)}% 50%`
  };

  const secondCircleStyle = {
    left: `${Math.max((65 - 30 * aboutSectionScroll), 50)}%`,
    maskPosition: `${Math.min(0 + aboutSectionScroll * 100, 50)}% 50%`
  };
  
  const textAnimationStyle = {
    letterSpacing: `${2.5 - 3 * aboutSectionScroll}vw`,
    opacity: `${aboutSectionScroll >= 0.5 ? 0 : 1}`
  };
  
  const captionAnimationStyle = {
    opacity: `${1 - aboutSectionScroll * 3}`
  };

  const mobileAnimation = {
    opacity: `${aboutSectionScroll === 1 ? 0 : 1}`
  };

  const scrollButtonStyle = {
    display: `${aboutSectionScroll !== 0 ? 'none' : 'block'}`
  };

  return (
    <StyledHeroSection ref={heroSectionRef} style={sectionStyle}>
      <StyledBackground style={backgroundStyle}>
        <StyledFirstCircle style={isMobile ? {} : firstCircleStyle}/>
        <StyledSecondCircle style={isMobile ? {} : secondCircleStyle}/>
      </StyledBackground>
      <StyledHeroContainer className={playfairDisplaySC.className}>
        <StyledHeaderPart style={isMobile ? mobileAnimation : textAnimationStyle}>
          <h3>Hello</h3>
        </StyledHeaderPart>
        <StyledHeaderPart className="interactive" style={isMobile ? mobileAnimation : textAnimationStyle}>
          <StyledFirstWord>World</StyledFirstWord>
          <StyledSecondWord onClick={() => helloThere.current.play()}>There</StyledSecondWord>
          <audio src={'hellothere.mp3'} ref={helloThere}/>
        </StyledHeaderPart>
        <StyledCaptions style={isMobile ? mobileAnimation : captionAnimationStyle}>
          <span>{isAltLang ? 'My name is Andry' : "Je m'appelle Andry"}</span>
          <span>{isAltLang ? 'I am a web developer' : 'Je suis développeur web'}</span>
          <span>{isAltLang ? 'Welcome to my portfolio' : 'Bienvenue sur mon portfolio'}</span>
        </StyledCaptions>
      </StyledHeroContainer>
      <StyledIconContainer style={scrollButtonStyle}>
        <ScrollButton />
      </StyledIconContainer>
    </StyledHeroSection>
  )
}