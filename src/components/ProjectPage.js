import { PortfolioContext } from "@/utils/Context"
import { useContext } from "react"
import { styled } from "styled-components"
import { playfairDisplay } from "@/styles/fonts"
import PortableText from "react-portable-text"
import { useLenis } from "@studio-freight/react-lenis"

const StyledProjectPage = styled.div`
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
  z-index: 1;
  opacity: 0;
  transition: all 0.5s;
  pointer-events: none;
  &.opened {
    opacity: 1;
    pointer-events: all;
  };
  background-color: ${props => props.theme.background+'EE'};
  color: ${props => props.theme.main};
`

const StyledProjectTitle = styled.h3`
  font-size: clamp(1.5rem, 4vw, 5rem);
  letter-spacing: 1vw;
  margin: auto;
  color: ${props => props.theme.main};
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.accent}
  }
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 5vh;
`

const StyledTextContainer = styled.div`
  width: 50vw;
  max-width: 1000px;
  text-align: justify;
  font-size: clamp(1rem, 1.25vw, 2rem);
  line-height: normal;
  @media (max-width: 768px) {
    width: 80vw;
  };
`

const StyledCloseButton = styled.a`
  padding: 1rem;
  border: 1px solid ${props => props.theme.main};
  &:hover {
    color: ${props => props.theme.accent};
    border-color: ${props => props.theme.accent};
  };
  width: fit-content;
  margin: auto;
  cursor: pointer;
`

const StyledTechContainer = styled.div`
  display: flex;
  font-size: clamp(1rem, 1.25vw, 2rem);
  line-height: normal;
  flex-direction: column;
  align-items: center;
`

const StyledTechList = styled.div`
  display: flex;
`

const StyledTechLabel = styled.a`
  padding: 1rem;
  color: ${props => props.theme.main};
  &:hover {
    color: ${props => props.theme.accent};
  }
`

export default function ProjectPage({ currentProject }) {
  const { projectPageIsOpened, setProjectPageIsOpened, isAltLang } = useContext(PortfolioContext);
  const lenis = useLenis();
  const handleCloseClick = () => {
    lenis.start();
    setProjectPageIsOpened(false);
  }
  
  const projectDescription = isAltLang ? currentProject.enDescription : currentProject.frDescription;

  return (
      <StyledProjectPage className={`${projectPageIsOpened && 'opened'} ${playfairDisplay.className}`}>
        <StyledContainer>
          <StyledProjectTitle as={'a'} href={currentProject.url} target="_blank" rel="noopener noreferrer">
            {`{ ${currentProject.title} }`}
          </StyledProjectTitle>
          <StyledTextContainer>
            <PortableText
              content={projectDescription}
            />
          </StyledTextContainer>
          <StyledTechContainer>
            <span>
              {isAltLang ? 'Technologies used :' : 'Technologies utilisées :'}
            </span>
            <StyledTechList>
              {currentProject.tech.map(tech => (
                <StyledTechLabel key={tech.name} target="_blank" rel="noopener noreferrer" href={tech.url}>
                  {tech.name}
                </StyledTechLabel>
              ))}
            </StyledTechList>
          </StyledTechContainer>
          <StyledCloseButton onClick={handleCloseClick}>
            Fermer
          </StyledCloseButton>
        </StyledContainer>
      </StyledProjectPage>
  )
}