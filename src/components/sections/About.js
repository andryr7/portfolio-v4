import { styled } from "styled-components"
import myPicture from '../../assets/mypicture.jpg'
import { useContext, useEffect, useRef } from "react"
import { PortfolioContext } from "@/utils/Context"
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import Image from "next/image"
import PortableText from "react-portable-text"
import { useNextSanityImage } from "next-sanity-image"
import { sanityClient } from "../../../sanity"
import SkillContainer from "../composables/SkillContainer"

const StyledAboutSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  display: flex;
  background-color: ${props => props.theme.background};
  border-top: 1px solid ${props => props.theme.main};
  //TODO Margin for hero section
  margin-top: 100vh;
`

const StyledTopContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15vh 0;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20vw;
  };
`

const StyledBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  text-align: center;
  line-height: 150%;
  gap: 7.5vh;
  padding: 15vh 0;
  width: 100%;
  border-top: 1px dashed ${props => props.theme.main};
`

const StyledImageContainer = styled.div`
  width: 35vw;
  max-width: 1000px;
  aspect-ratio: 1.5;
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
    top: 1vw;
    left: 1vw;
    z-index: -1;
    border: 1px solid ${props => props.theme.main};
  }
  @media (max-width: 768px) {
    width: 70vw;
  };
`;

const StyledTextContainer = styled.div`
  width: 35vw;
  max-width: 1000px;
  color: ${props => props.theme.main};
  text-align: justify;
  font-size: clamp(1rem, 1.25vw, 2rem);
  line-height: normal;
  @media (max-width: 768px) {
    width: 70vw;
  };
`

const StyledItemCaption = styled.span`
  font-size: 1.5rem;
`

const StyledItemContainer = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 768px) {
    flex-direction: column;
  };
`

export default function About({ infoData, skillData }) {
  const { aboutSectionRef, isAltLang } = useContext(PortfolioContext);
  const imageProps = useNextSanityImage(sanityClient, infoData.picture);

  const frontendSkills = skillData.filter(skill => skill.skilltype === 'frontend');
  const backendSkills = skillData.filter(skill => skill.skilltype === 'backend');
  const projectmgmtSkills = skillData.filter(skill => skill.skilltype === 'projectmgmt');

  return (
    <StyledAboutSection ref={aboutSectionRef}>
      <StyledTopContainer>
        <StyledImageContainer>
          <Image
            src={imageProps.src}
            fill
            alt="Photographie de Andry Ratsimba"
            style={{objectFit: "cover"}}
            quality={100}
            sizes="(max-width: 768px) 70vw, 35vw"
            priority={true}
          />
        </StyledImageContainer>
        <StyledTextContainer>
          <PortableText
            content={isAltLang ? infoData.enPresentationText : infoData.frPresentationText}
          />
        </StyledTextContainer>
      </StyledTopContainer>
      <StyledBottomContainer>
        <StyledItemCaption>
          Domaines de compétence :
        </StyledItemCaption>
        <StyledItemContainer>
          <SkillContainer 
            title={isAltLang ? 'Frontend web development' : 'Développement web frontend'}
            skills={frontendSkills}
            delay={0}
          />
          <SkillContainer 
            title={isAltLang ? 'Backend web development' : 'Développement web backend'}
            skills={backendSkills}
            delay={0.5}
          />
          <SkillContainer 
            title={isAltLang ? 'Project management' : 'Gestion de projet'}
            skills={projectmgmtSkills}
            delay={1}
          />
        </StyledItemContainer>
      </StyledBottomContainer>
    </StyledAboutSection>
  )
}