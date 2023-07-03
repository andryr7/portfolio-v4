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
  padding: 10vh 0;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20vw;
  };
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

const StyledImg = styled.img`
  height: 100%;
  width: 100%;
`

const StyledTextContainer = styled.div`
  width: 35vw;
  max-width: 1000px;
  color: ${props => props.theme.main};
  text-align: justify;
  font-size: clamp(1rem, 1.25vw, 2rem);
  @media (max-width: 768px) {
    width: 70vw;
  };
`

const StyledBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  text-align: center;
  line-height: 150%;
  gap: 2.5rem;
  padding: 10vh 0;
  width: 100%;
  border-top: 1px dashed ${props => props.theme.main};
`

const StyledItemCaption = styled.span`
  font-size: 1.5rem;
`

const StyledItemContainer = styled.ul`
  display: flex;
  gap: 10vw;
  @media (max-width: 768px) {
    flex-direction: column;
  };
`

const StyledHexContent = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.background};
  width: calc(20vw - 2px);
  max-width: 498px;
  aspect-ratio: .915;
  -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); 
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  position: relative;
  @media (max-width: 768px) {
    width: calc(61vw - 2px);
  };
`

const StyledHexTitle = styled.h4`
  font-size: clamp(1.25rem, 1.5vw, 2rem);
`

const StyledSlidercontainer = styled.div`
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const StyledHexContainer = styled.article`
  width: 20vw;
  max-width: 500px;
  aspect-ratio: .91;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.main};
  -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); 
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  transition: all 0.5s;
  &:hover {
    background-color: ${props => props.theme.accent};
    & ${StyledHexContent} {
      width: calc(20vw - 8px);
      @media (max-width: 768px) {
        width: calc(61vw - 8px);
      };
    }
    & ${StyledHexTitle} {
      opacity: 0;
    }
    & ${StyledSlidercontainer} {
      display: flex;
    }
  }
  @media (max-width: 768px) {
    width: 61vw;
  };
`

const StyledSkillItem = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
`

export default function About({ infoData, skillData }) {
  const { aboutSectionRef, isAltLang } = useContext(PortfolioContext);
  const imageProps = useNextSanityImage(sanityClient, infoData.picture);
  const frontendSliderRef = useRef(null);
  const backendSliderRef = useRef(null);
  const projectMgmtSliderRef = useRef(null);

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
          <StyledHexContainer>
            <StyledHexContent>
              <StyledHexTitle>
                {isAltLang ? 'Frontend web development' : 'Développement web frontend'}
              </StyledHexTitle>
              <StyledSlidercontainer
                onMouseEnter={() => {frontendSliderRef.current.splide.Components.Autoplay.play()}}
                onMouseLeave={() => {frontendSliderRef.current.splide.Components.Autoplay.pause()}}
              >
                <Splide
                  ref={frontendSliderRef}
                  aria-label="Frontend skills carousel"
                  options={{
                    type: 'fade',
                    rewind: true,
                    pauseOnHover : false,
                    interval: 1000,
                    pagination: false,
                    arrows: false,
                  }}
                >
                  {frontendSkills.map(skill => (
                    <SplideSlide key={skill._id}>
                      <StyledSkillItem>
                        {isAltLang ? skill.enName : skill.frName}
                      </StyledSkillItem>
                    </SplideSlide>
                  ))}
                </Splide>
              </StyledSlidercontainer>
            </StyledHexContent>
          </StyledHexContainer>
          <StyledHexContainer>
            <StyledHexContent>
              <StyledHexTitle>
                {isAltLang ? 'Backend web development' : 'Développement web backend'}
              </StyledHexTitle>
              <StyledSlidercontainer
                onMouseEnter={() => {backendSliderRef.current.splide.Components.Autoplay.play()}}
                onMouseLeave={() => {backendSliderRef.current.splide.Components.Autoplay.pause()}}
              >
                <Splide
                  ref={backendSliderRef}
                  aria-label="Backend skills carousel"
                  options={{
                    type: 'fade',
                    rewind: true,
                    pauseOnHover : false,
                    interval: 1000,
                    pagination: false,
                    arrows: false,
                  }}
                >
                  {backendSkills.map(skill => (
                    <SplideSlide key={skill._id}>
                      <StyledSkillItem>
                        {isAltLang ? skill.enName : skill.frName}
                      </StyledSkillItem>
                    </SplideSlide>
                  ))}
                </Splide>
              </StyledSlidercontainer>
            </StyledHexContent>
          </StyledHexContainer>
          <StyledHexContainer>
            <StyledHexContent>
              <StyledHexTitle>
                {isAltLang ? 'Project management' : 'Gestion de projet'}
              </StyledHexTitle>
              <StyledSlidercontainer
                onMouseEnter={() => {projectMgmtSliderRef.current.splide.Components.Autoplay.play()}}
                onMouseLeave={() => {projectMgmtSliderRef.current.splide.Components.Autoplay.pause()}}
              >
                <Splide
                  ref={projectMgmtSliderRef}
                  aria-label="Project management skills carousel"
                  options={{
                    type: 'fade',
                    rewind: true,
                    autoplay: true,
                    pauseOnHover : false,
                    interval: 1000,
                    pagination: false,
                    arrows: false,
                  }}
                >
                  {projectmgmtSkills.map(skill => (
                    <SplideSlide key={skill._id}>
                      <StyledSkillItem>
                        {isAltLang ? skill.enName : skill.frName}
                      </StyledSkillItem>
                    </SplideSlide>
                  ))}
                </Splide>
              </StyledSlidercontainer>
            </StyledHexContent>
          </StyledHexContainer>
        </StyledItemContainer>
      </StyledBottomContainer>
    </StyledAboutSection>
  )
}