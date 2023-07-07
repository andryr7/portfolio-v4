import { PortfolioContext } from "@/utils/Context"
import { useContext } from "react"
import { styled } from "styled-components"
import githubdark from '../assets/contact/githubdark.png'
import githublight from '../assets/contact/githublight.png'
import linkedindark from '../assets/contact/linkedindark.png'
import linkedinlight from '../assets/contact/linkedinlight.png'
import emaildark from '../assets/contact/emaildark.png'
import emaillight from '../assets/contact/emaillight.png'
import noisefilter from '../assets/noise.svg'

const StyledContactMenu = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  top:0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: -1;
  opacity: 0;
  transition: all 0.5s;
  &.opened {
    opacity: 1;
    pointer-events: all;
  };
  background-color: ${props => props.theme.background+'DD'};
  /* backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px); */
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

const StyledContactLinkSpan = styled.span`
  font-size: 1.25rem;
  opacity: 0;
  transition: all 0.5s;
  transform: translateY(-100%);
  @media (max-width: 768px) {
    display: none;
  };
`

const StyledContactLinkShape = styled.a`
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  aspect-ratio: 1;
  width: min(25vw, 50vh);
  background-color: ${props => props.theme.main};
  margin-left: -5vw;
  transition: width 0.5s;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    width: max(40vw, 500px);
    background-color: ${props => props.theme.accent};
    & span {
      opacity: 1;
      transform: translateY(0);
    }
  };
  @media (max-width: 768px) {
    margin-left: 0;
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
`

export default function ContactMenu({ infoData }) {
  const { contactMenuIsOpened, isDarkMode, isAltLang } = useContext(PortfolioContext);

  return(
    <StyledContactMenu className={contactMenuIsOpened && 'opened'}>
      <StyledContactContainer>
        <StyledContactLinkShape href={infoData.linkedin} target="_blank" rel="roopener noreferer">
          <StyledContactLinkContent>
            <StyledContactLinkTitle>
              LinkedIn
            </StyledContactLinkTitle>
            <StyledContactIcon src={isDarkMode ? linkedinlight.src : linkedindark.src}/>
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
            <StyledContactIcon src={isDarkMode ? githublight.src : githubdark.src}/>
            <StyledContactLinkSpan>
              {isAltLang ? 'Take a look at my code' : 'Jetez un oeil à mon code'}
            </StyledContactLinkSpan>
          </StyledContactLinkContent>
        </StyledContactLinkShape>
        <StyledContactLinkShape href={'mailto:contact@andryratsimba.com'} target="_blank" rel="roopener noreferer">
          <StyledContactLinkContent>
            <StyledContactLinkTitle>
              Email
            </StyledContactLinkTitle>
            <StyledContactIcon src={isDarkMode ? emaillight.src : emaildark.src}/>
            <StyledContactLinkSpan>
              {isAltLang ? 'Contact me directly' : 'Contactez-moi directement'}
            </StyledContactLinkSpan>
          </StyledContactLinkContent>
        </StyledContactLinkShape>
      </StyledContactContainer>
    </StyledContactMenu>
  )
}