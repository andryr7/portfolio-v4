import Head from 'next/head'
import styled from 'styled-components'
import { playfairDisplay } from '@/styles/fonts'
import Frame from '@/components/Frame'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Work from '@/components/sections/Work'
import GradientBackground from '@/components/GradientBackground'
import GrainFilter from '@/components/GrainFilter'
import NoiseFilter from '@/components/NoiseFilter'

const StyledAppContainer = styled.div``

const StyledMain = styled.main`
  color: ${props => props.theme.main};
  padding-left: calc(1rem + 4px);
  padding-right: calc(1rem + 4px);
`

export default function Home() {
  return (
    <>
      <Head>
        <title>Andry Ratsimba - Développeur web</title>
        <meta name="description" content="Portfolio de Andry Ratsimba, développeur web fullstack basé à Toulouse" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledAppContainer>
        <GradientBackground />
        <StyledMain className={`${playfairDisplay.className}`}>
          <Hero />
          <About />
          <Work />
        </StyledMain>
      </StyledAppContainer>
      {/* <ContactMenu /> */}
      <Frame />
      <GrainFilter />
      {/* <NoiseFilter /> */}
    </>
  )
}
