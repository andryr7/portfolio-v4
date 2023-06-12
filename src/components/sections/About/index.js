import { styled } from "styled-components"
import myPicture from '../../../assets/mypicture.jpg'

const StyledAboutSection = styled.section`
  height: 100lvh;
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`

const StyledContainer = styled.div`
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
  background-color: red;
`

export default function About() {
  return (
    <StyledAboutSection >
      <StyledContainer>
        <StyledImageContainer>
          <StyledImg src={myPicture.src} />
        </StyledImageContainer>
        <StyledTextContainer>
          Passionné par l’informatique et la résolution de problème depuis l’enfance, je me suis reconverti vers le métier de développeur après plusieurs stages en webmarketing qui m’ont permis de découvrir ce métier. J’ai désormais à coeur de développer des solutions innovantes et créatives pour le web.
        </StyledTextContainer>
      </StyledContainer>
    </StyledAboutSection>
  )
}