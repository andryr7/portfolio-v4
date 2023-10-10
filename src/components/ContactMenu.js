import { PortfolioContext } from "@/utils/Context"
import { useContext, useState } from "react"
import { keyframes, styled } from "styled-components"
import githubdark from '../assets/contact/githubdark.png'
import githublight from '../assets/contact/githublight.png'
import linkedindark from '../assets/contact/linkedindark.png'
import linkedinlight from '../assets/contact/linkedinlight.png'
import emaildark from '../assets/contact/emaildark.svg'
import emaillight from '../assets/contact/emaillight.svg'
import { playfairDisplay } from "@/styles/fonts"

const StyledContactMenu = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 7.5vh;
  z-index: 2;
  opacity: 0;
  transition: all 0.5s;
  pointer-events: none;
  &.opened {
    opacity: 1;
    pointer-events: all;
  };
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  @media (max-width: 768px) {
    background-color: ${props => props.theme.background+'DD'};
    backdrop-filter: none;
  };
`

const StyledSectionTitle = styled.span`
  font-size: clamp(1.5rem, 4vw, 5rem);
  letter-spacing: 1vw;
  margin-left: auto;
  margin-right: auto;
  color: ${props => props.theme.main};
`

const StyledContactContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  };
`

const StyledContactLinkTitle = styled.span`
  font-size: 2rem;
  opacity: 0;
  transition: all 0.5s;
  transform: translateY(100%);
  @media (max-width: 768px) {
    display: none;
  };
`

const flickerAnimation = keyframes`
  0% {opacity:0;}
  9% {opacity:0;}
  10% {opacity:.5;}
  13% {opacity:0;}
  20% {opacity:.5;}
  25% {opacity:1;}
`

const StyledContactLinkSpan = styled.span`
  font-size: min(1.3vw, 1.5rem);
  opacity: 0;
  transition: all 0.5s;
  transform: translateY(-100%);
  @media (max-width: 768px) {
    display: none;
  };
  &.animated {
    animation: ${flickerAnimation} 1s linear;
  }
`

const StyledContactLinkShape = styled.a`
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  aspect-ratio: 1;
  width: 30vw;
  max-width: 600px;
  background-color: ${props => props.theme.main};
  margin-left: -2.5vw;
  margin-right: -2.5vw;
  transition: all 0.5s;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    width: 40vw;
    max-width: 750px;
    background-color: ${props => props.theme.accent};
    & span {
      opacity: 1;
      transform: translateY(0);
    }
  };
  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
    margin-top: -10vw;
    width: 50vw;
    &:hover {
      width: 50vw;
    };
  };
`

const StyledContactLinkContent = styled.div`
  position: absolute;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  background-color: ${props => props.theme.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 7.5%;
  shape-outside: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  color: ${props => props.theme.main};
`

const StyledContactIcon = styled.img`
  width: max(3rem, 5vw);
  max-width: 125px;
`

export default function ContactMenu({ infoData }) {
  const { contactMenuIsOpened, isDarkMode, isAltLang } = useContext(PortfolioContext);
  const [emailWasCopied, setEmailWasCopied] = useState(false);

  const handleEmaiClick = () => {
    navigator.clipboard.writeText('contact@andryratsimba.com');
    setEmailWasCopied(true);
    setTimeout(() => setEmailWasCopied(false), 5000);
  }

  return(
    <StyledContactMenu className={`${contactMenuIsOpened && 'opened'} ${playfairDisplay.className}`}>
      <StyledSectionTitle>
        {'{ contact }'}
      </StyledSectionTitle>
      <StyledContactContainer>
        <StyledContactLinkShape href={infoData.linkedin} target="_blank" rel="roopener noreferer">
          <StyledContactLinkContent>
            <StyledContactLinkTitle>
              LinkedIn
            </StyledContactLinkTitle>
            <StyledContactIcon src={isDarkMode ? linkedinlight.src : linkedindark.src} alt="LinkedIn Logo" />
            <StyledContactLinkSpan>
              {isAltLang ? 'Consult my professionnal profile' : 'Consultez mon profil professionnel'}
            </StyledContactLinkSpan>
          </StyledContactLinkContent>
        </StyledContactLinkShape>
        <StyledContactLinkShape href={infoData.github} target="_blank" rel="roopener noreferer">
          <StyledContactLinkContent>
            <StyledContactLinkTitle>
              GitHub
            </StyledContactLinkTitle>
            <StyledContactIcon src={isDarkMode ? githublight.src : githubdark.src} alt="GitHub Logo" />
            <StyledContactLinkSpan>
              {isAltLang ? 'Take a look at my code' : 'Jetez un oeil à mon code'}
            </StyledContactLinkSpan>
          </StyledContactLinkContent>
        </StyledContactLinkShape>
        <StyledContactLinkShape onClick={handleEmaiClick}>
          <StyledContactLinkContent>
            <StyledContactLinkTitle>
              Email
            </StyledContactLinkTitle>
            <StyledContactIcon src={isDarkMode ? emaillight.src : emaildark.src} alt="Email Icon" />
            <StyledContactLinkSpan className={emailWasCopied && 'animated'}>
              {!emailWasCopied && isAltLang && 'Copy my email address'}
              {!emailWasCopied && !isAltLang && 'Copier mon adresse email'}
              {emailWasCopied && isAltLang && 'Email address was copied !'}
              {emailWasCopied && !isAltLang && 'Adresse email copiée !'}
            </StyledContactLinkSpan>
          </StyledContactLinkContent>
        </StyledContactLinkShape>
      </StyledContactContainer>
    </StyledContactMenu>
  )
}