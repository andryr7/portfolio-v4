import Head from "next/head";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { playfairDisplay } from "@/styles/fonts";
import { PortfolioContext } from "@/utils/Context";
import { useLenis } from "@studio-freight/react-lenis";
import { sanityClient } from "../../sanity";
import Frame from "@/components/Frame";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import NoiseFilter from "@/components/NoiseFilter";
import ContactMenu from "@/components/ContactMenu";
import { createGlobalStyle } from "styled-components";
import ProjectPage from "@/components/ProjectPage";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
  }
`;

const StyledMain = styled.main`
  color: ${(props) => props.theme.main};
  width: 100%;
  box-sizing: border-box;
  padding-left: calc(1vw + 2px);
  padding-right: calc(1vw + 2px);
`;

export default function Home({ infoData, projectData, skillData }) {
  const {
    aboutSectionRef,
    workSectionRef,
    isAltLang,
    setContactMenuIsOpened,
    setProjectPageIsOpened,
  } = useContext(PortfolioContext);
  const [currentSection, setCurrentSection] = useState("hero");
  const [aboutSectionScroll, setAboutSectionScroll] = useState(0);
  const [workSectionScroll, setWorkSectionScroll] = useState(0);
  const [currentProject, setCurrentProject] = useState(projectData[0]);

  //Adding the lang attribute to html
  useEffect(() => {
    if (!document) {
      return;
    }

    const htmlElement = document.querySelector("html");

    if (isAltLang) {
      htmlElement.lang = "en";
    } else {
      htmlElement.lang = "fr";
    }
  }, [isAltLang]);

  // Scroll and current section updating
  const lenis = useLenis(() => {
    // Current section updating
    const workSectionTop = workSectionRef.current.getBoundingClientRect().top;
    const workSectonBottom =
      workSectionRef.current.getBoundingClientRect().bottom;
    if (workSectionTop > window.innerHeight / 2) {
      setCurrentSection("hero");
    } else {
      if (workSectonBottom < window.innerHeight / 2) {
        setCurrentSection("about");
      } else {
        setCurrentSection("work");
      }
    }

    // About section scroll updating
    const aboutSectionRectTop =
      aboutSectionRef.current.getBoundingClientRect().top;
    const min = window.innerHeight;
    const max = window.innerHeight * 1;
    const aboutRatio = -(aboutSectionRectTop - min) / max;
    const clampedAboutRatio = Math.min(aboutRatio, 1);
    setAboutSectionScroll(clampedAboutRatio);

    // Work section scroll updating
    const workSectionRectTop =
      workSectionRef.current.getBoundingClientRect().top;
    const workRatio = -(workSectionRectTop - min) / max;
    const clampedWorkRatio = Math.min(workRatio, 1);
    setWorkSectionScroll(clampedWorkRatio);
  });

  useEffect(() => {
    //Handling escape key press to close contact menu and project page
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        lenis.start();
        setContactMenuIsOpened(false);
        setProjectPageIsOpened(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <>
      <Head>
        <title>Andry Ratsimba - Développeur web</title>
        <meta
          name="description"
          content="Portfolio de Andry Ratsimba, développeur web fullstack basé à Toulouse"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <noscript>
          <span>Merci d&apos;activer Javascript pour consulter ce site.</span>
        </noscript>
      </Head>
      <GlobalStyle />
      <StyledMain className={`${playfairDisplay.className}`}>
        <Hero
          aboutSectionScroll={aboutSectionScroll}
          workSectionScroll={workSectionScroll}
        />
        <Work
          projectData={projectData}
          workSectionScroll={workSectionScroll}
          aboutSectionScroll={aboutSectionScroll}
          setCurrentProject={setCurrentProject}
        />
        <About
          infoData={infoData}
          skillData={skillData}
          aboutSectionScroll={aboutSectionScroll}
        />
      </StyledMain>
      <ContactMenu infoData={infoData} />
      <ProjectPage currentProject={currentProject} />
      <Frame currentSection={currentSection} />
      {/* <GrainFilter /> */}
      <NoiseFilter />
    </>
  );
}

export async function getStaticProps() {
  const { infoData, projectData, skillData } = await sanityClient.fetch(
    `{
      "infoData": *[_type == "info"][0]{picture, enPresentationText, frPresentationText, linkedin, github},
      "projectData": *[_type == "project"] | order(releaseDate asc){_id, title, image, url, repo, tech[]->{name, url}, frDescription, enDescription},
      "skillData": *[_type == "skill"]{_id, enName, frName, "skilltype": type->slug},
    }`
  );

  return {
    props: {
      infoData,
      projectData,
      skillData,
    },
  };
}
