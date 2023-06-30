import Head from 'next/head'
import styled from 'styled-components'
import { playfairDisplay } from '@/styles/fonts'
import Frame from '@/components/Frame'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Work from '@/components/sections/Work'
import GrainFilter from '@/components/GrainFilter'
import { useContext, useEffect, useRef } from 'react'
import { PortfolioContext } from '@/utils/Context'
import { useLenis } from '@studio-freight/react-lenis'
import { sanityClient } from '../../sanity'
import useScroll from '@/utils/useScrollProgress'

const StyledAppContainer = styled.div`
`

const StyledMain = styled.main`
  color: ${props => props.theme.main};
  width: 100%;
  box-sizing: border-box;
  padding-left: calc(1vw + 2px);
  padding-right: calc(1vw + 2px);
`

export default function Home({ infoData, projectData, skillData }) {
  const { aboutSectionRef, workSectionRef, setCurrentSection } = useContext(PortfolioContext);
  
  // Finding the current section
  useLenis(() => {
    const aboutSectionTop = aboutSectionRef.current.getBoundingClientRect().top;
    const workSectionTop = workSectionRef.current.getBoundingClientRect().top;
    if (aboutSectionTop > (window.innerHeight / 2)) {
      setCurrentSection('hero');
    }
    else {
      if(Math.abs(aboutSectionTop) < Math.abs(workSectionTop)) {
        setCurrentSection('about');
      }
      else {
        setCurrentSection('work')
      }
    }
  })

  return (
    <>
      <Head>
        <title>Andry Ratsimba - Développeur web</title>
        <meta name="description" content="Portfolio de Andry Ratsimba, développeur web fullstack basé à Toulouse" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledAppContainer>
        <StyledMain className={`${playfairDisplay.className}`}>
          <Hero />
          <About infoData={infoData} skillData={skillData}/>
          <Work projectData={projectData}/>
        </StyledMain>
        <Frame infoData={infoData}/>
        <GrainFilter />
      </StyledAppContainer>
    </>
  )
}

export async function getStaticProps() {
  const { infoData, projectData, skillData } = await sanityClient.fetch(
    `{
      "infoData": *[_type == "info"][0],
      "projectData": *[_type == "project"] | order(releaseDate asc),
      "skillData": *[_type == "skill"],
    }`
  );

  return {
    props: {
      infoData,
      projectData,
      skillData
    },
    revalidate: 60,
  };
}