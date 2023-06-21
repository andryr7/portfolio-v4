import { styled } from "styled-components"
import myPicture from '../../assets/mypicture.jpg'
import { useContext, useEffect, useRef } from "react";
import { PortfolioContext } from "@/utils/Context";

const StyledAboutSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  display: flex;
  gap: 20vh;
`

const StyledTopContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 5vw;
`

const StyledImageContainer = styled.div`
  width: 450px;
  max-width: 40lvw;
  border: 1px solid ${props => props.theme.main};
  position: relative;
  top: 0;
  z-index: 0;
  &:hover:before {
    top: -1px;
    left: -1px;
  }
  &:before {
    transition: all 0.5s;
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: -1;
    border: 1px solid ${props => props.theme.main};
  }
`;

const StyledImg = styled.img`
  height: 100%;
  width: 100%;
`

const StyledTextContainer = styled.div`
  max-width: 40lvw;
  color: ${props => props.theme.main};
  text-align: justify;
  font-size: 1.5rem;
`

const StyledBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  text-align: center;
  line-height: 150%;
  gap: 2.5rem;
`

const StyledItemCaption = styled.span`
  font-size: 1.5rem;
`

const StyledItemContainer = styled.ul`
  display: flex;
  gap: 10vw;
`

const StyledHexContent = styled.li`
  background-color: ${props => props.theme.background};
  width: 248px;
  height: 273px;
  -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); 
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledHexContainer = styled.article`
  background-color: ${props => props.theme.main};
  width: 250px;
  height: 275px;
  -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); 
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
  &:hover {
    background-color: ${props => props.theme.orange};
    & ${StyledHexContent} {
      width: 244px;
      height: 267px;
    }
  }
`

export default function About() {
  const { aboutSectionRef, setBackgroundShift } = useContext(PortfolioContext);

  useEffect(() => {
    const handleScroll = () => {
      const sectionRectTop = aboutSectionRef.current.getBoundingClientRect().top;
      const min = window.innerHeight;
      const max = window.innerHeight / 2;
      const ratio = - (sectionRectTop - min) / max;
      const clampedRatio = Math.min(ratio, 1);
      setBackgroundShift(clampedRatio)
    }

    document.addEventListener('scroll', handleScroll);

    return (() => {
      document.removeEventListener('scroll', handleScroll)
    })
  })

  return (
    <StyledAboutSection ref={aboutSectionRef}>
      <StyledTopContainer>
        <StyledImageContainer>
          <StyledImg src={myPicture.src} />
        </StyledImageContainer>
        <StyledTextContainer>
          Passionné par l’informatique et la résolution de problème depuis l’enfance, je me suis reconverti vers le métier de développeur après plusieurs stages en webmarketing qui m’ont permis de découvrir ce métier. J’ai désormais à coeur de développer des solutions innovantes et créatives pour le web.
        </StyledTextContainer>
      </StyledTopContainer>
      <StyledBottomContainer>
        <StyledItemCaption>
          Domaines de compétence :
        </StyledItemCaption>
        <StyledItemContainer>
          <StyledHexContainer>
            <StyledHexContent>
              Développement frontend
            </StyledHexContent>
          </StyledHexContainer>
          <StyledHexContainer>
            <StyledHexContent>
              Développement backend
            </StyledHexContent>
          </StyledHexContainer>
          <StyledHexContainer>
            <StyledHexContent>
              Gestion de projet
            </StyledHexContent>
          </StyledHexContainer>
        </StyledItemContainer>
      </StyledBottomContainer>
    </StyledAboutSection>
  )
}