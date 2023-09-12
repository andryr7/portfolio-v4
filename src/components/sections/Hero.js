import { styled, useTheme } from "styled-components"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { PortfolioContext } from "@/utils/Context"
import { playfairDisplaySC } from "@/styles/fonts"
import noisefilter from '../../assets/noise.svg'
import ScrollButton from "../interactivity/ScrollButton"
import { useMediaQuery } from "@studio-freight/hamo"

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
    linear-gradient(180deg, #f85b3b, rgba(217,217,217,0) 50%);
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
  @media (max-width: 1000px) {
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
  @media (max-width: 1000px) {
    font-size: min(10rem, 20vw);
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
  font-size: clamp(1.1rem, 1.5vw, 2rem);
  line-height: clamp(1.5rem, 2vw, 3rem);
  letter-spacing: 0.35vw;
  position: absolute;
  top: 100%;
  left: clamp(1rem, 3.5vw, 5rem);
  width: fit-content;
  @media (max-width: 1000px) {
    margin-top: 0.5rem;
    position: static;
    flex-direction: column;
    align-items: center;
    width: 100%;
  };
`

const StyledCaptionContainer = styled.div`
  display: flex;
  &:first-of-type {
    & span:last-of-type {
      opacity: 0;
      transition: opacity 0.5s;
      @media (max-width: 1000px) {
        opacity: 1;
      };
    }
    &:hover span:last-of-type {
      opacity: 1;
    }
  }
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

export default function Hero({ aboutSectionScroll, workSectionScroll }) {
  const { heroSectionRef, isAltLang } = useContext(PortfolioContext);
  const helloThere = useRef(null);
  const theme = useTheme();
  const [hackerString, setHackerString] = useState('développeur web');
  const isMobile = useMediaQuery('(max-width: 768px)');

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

  const mobileTextAnimationStyle = {
    opacity: `${aboutSectionScroll >= 0.5 ? 0 : 1}`
  };
  
  const captionAnimationStyle = {
    opacity: `${1 - aboutSectionScroll * 3}`
  };

  const scrollButtonStyle = {
    display: `${aboutSectionScroll !== 0 ? 'none' : 'block'}`
  };

  const noStyle = {};

  // Handling the job text animation
  const handleAnimateText = useCallback(() => {
    const letters = isAltLang ? "abcdefghijklmnopqrstuvwxyz " : "abcdéfghijklmnopqrstuvwxyz ";
    const targetWord = isAltLang ? 'web developer' : 'développeur web';
    let iteration = 0;
    const maxIterations = targetWord.length;
    const interval = setInterval(() => {
      if(iteration > maxIterations) {
        clearInterval(interval);
        return
      }
      const randomizedWord = targetWord
          .split("")
          .map((letter, index) => {
            if(index < iteration) {
              return targetWord[index]
            }
            return letters[Math.floor(Math.random() * 27)]})
          .join('');
      setHackerString(randomizedWord);
      iteration += 1;
    }, 35)
  }, [isAltLang]);

  // Changing the default string on language change
  useEffect(() => {
    const newHackerString = isAltLang ? 'web developer' : 'développeur web';
    setHackerString(newHackerString)
  },[isAltLang]);

  return (
    <StyledHeroSection ref={heroSectionRef} style={sectionStyle}>
      <StyledBackground style={backgroundStyle}>
        <StyledFirstCircle style={isMobile ? noStyle : firstCircleStyle}/>
        <StyledSecondCircle style={isMobile ? noStyle : secondCircleStyle}/>
      </StyledBackground>
      <StyledHeroContainer className={playfairDisplaySC.className}>
        <StyledHeaderPart style={isMobile ? mobileTextAnimationStyle : textAnimationStyle}>
          <h3>Hello</h3>
        </StyledHeaderPart>
        <StyledHeaderPart className="interactive" style={isMobile ? mobileTextAnimationStyle : textAnimationStyle}>
          <StyledFirstWord>World</StyledFirstWord>
          <StyledSecondWord onClick={() => helloThere.current.play()}>There</StyledSecondWord>
          <audio src={'hellothere.mp3'} ref={helloThere}/>
        </StyledHeaderPart>
        <StyledCaptions style={isMobile ? mobileTextAnimationStyle : captionAnimationStyle}>
          <StyledCaptionContainer>
            <span>{isAltLang ? 'My name is' : "Je m'appelle"}</span>
            <span>&nbsp;Andry</span>
            <span>&nbsp;Ratsimba</span>
          </StyledCaptionContainer>
          <StyledCaptionContainer onMouseEnter={() => handleAnimateText()}>
            <span>{isAltLang ? 'I am a' : 'Je suis'}&nbsp;</span>
            <span>{hackerString}</span>
          </StyledCaptionContainer>
          <span>{isAltLang ? 'Welcome to my portfolio' : 'Bienvenue sur mon portfolio'}</span>
        </StyledCaptions>
      </StyledHeroContainer>
      <StyledIconContainer style={scrollButtonStyle}>
        <ScrollButton />
      </StyledIconContainer>
    </StyledHeroSection>
  )
}