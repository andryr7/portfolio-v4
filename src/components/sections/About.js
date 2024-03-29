import { styled } from "styled-components";
import { useContext, useMemo } from "react";
import { PortfolioContext } from "@/utils/Context";
import "@splidejs/react-splide/css";
import Image from "next/image";
import PortableText from "react-portable-text";
import { useNextSanityImage } from "next-sanity-image";
import { sanityClient } from "../../../sanity";
import SkillContainer from "../composables/SkillContainer";
import { useMediaQuery } from "@studio-freight/hamo";
import { lato } from "@/styles/fonts";

const StyledAboutSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  display: flex;
`;

const StyledInterlude = styled.section`
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
  pointer-events: none;
`;

const StyledSectionTitle = styled.span`
  font-size: clamp(1.5rem, 4vw, 5rem);
  letter-spacing: 1vw;
  transition: opacity 0.5s;
`;

const StyledTopContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15vh 0;
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.main};
  background-color: ${(props) => props.theme.background};
  transition: background-color 0.5s;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20vw;
  }
`;

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
  border-top: 1px dashed ${(props) => props.theme.main};
  background-color: ${(props) => props.theme.background};
  transition: background-color 0.5s;
  z-index: 1;
`;

const StyledImageContainer = styled.div`
  width: 35vw;
  max-width: 1000px;
  aspect-ratio: 1.5;
  border: 1px solid ${(props) => props.theme.main};
  position: relative;
  top: 0;
  z-index: 0;
  &:hover:before {
    top: -1px;
    left: -1px;
  }
  &:before {
    transition: all 0.5s;
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 1vw;
    left: 1vw;
    z-index: -1;
    border: 1px solid ${(props) => props.theme.main};
  }
  @media (max-width: 768px) {
    width: 80vw;
  }
`;

const StyledTextContainer = styled.div`
  width: 35vw;
  max-width: 1000px;
  color: ${(props) => props.theme.main};
  text-align: justify;
  font-size: clamp(1rem, 1.25vw, 2rem);
  line-height: normal;
  @media (max-width: 768px) {
    width: 80vw;
  }
`;

const StyledItemCaption = styled.span`
  font-size: 2rem;
`;

const StyledItemContainer = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 7.5vh;
  }
`;

export default function About({ infoData, skillData, aboutSectionScroll }) {
  const { aboutSectionRef, isAltLang } = useContext(PortfolioContext);
  const imageProps = useNextSanityImage(sanityClient, infoData.picture);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const frontendSkills = useMemo(
    () => skillData.filter((skill) => skill.skilltype === "frontend"),
    [skillData]
  );

  const backendSkills = useMemo(
    () => skillData.filter((skill) => skill.skilltype === "backend"),
    [skillData]
  );

  const projectmgmtSkills = useMemo(
    () => skillData.filter((skill) => skill.skilltype === "other"),
    [skillData]
  );

  const sectionTitleStyle = {
    letterSpacing: `${1 + aboutSectionScroll}vw`,
  };

  const noStyle = {};

  return (
    <StyledAboutSection ref={aboutSectionRef}>
      <StyledInterlude>
        <StyledSectionTitle style={isMobile ? noStyle : sectionTitleStyle}>
          {isAltLang ? "{ about} " : "{ à propos }"}
        </StyledSectionTitle>
      </StyledInterlude>
      <StyledTopContainer>
        <StyledImageContainer>
          <Image
            src={imageProps.src}
            loader={imageProps.loader}
            fill
            alt="Photographie de Andry Ratsimba"
            style={{ objectFit: "cover" }}
            quality={75}
            sizes="(max-width: 768px) 80vw, 35vw"
            priority={true}
          />
        </StyledImageContainer>
        <StyledTextContainer className={lato.className}>
          <PortableText
            content={
              isAltLang
                ? infoData.enPresentationText
                : infoData.frPresentationText
            }
          />
        </StyledTextContainer>
      </StyledTopContainer>
      <StyledBottomContainer>
        <StyledItemCaption>
          {isAltLang ? "Skills :" : "Compétences :"}
        </StyledItemCaption>
        <StyledItemContainer>
          <SkillContainer
            title={
              isAltLang
                ? "Frontend web development"
                : "Développement web frontend"
            }
            skills={frontendSkills}
            delay={0}
          />
          <SkillContainer
            title={
              isAltLang
                ? "Backend web development"
                : "Développement web backend"
            }
            skills={backendSkills}
            delay={0.5}
          />
          <SkillContainer
            title={isAltLang ? "Project management" : "Gestion de projet"}
            skills={projectmgmtSkills}
            delay={1}
          />
        </StyledItemContainer>
      </StyledBottomContainer>
    </StyledAboutSection>
  );
}
