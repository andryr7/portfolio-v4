import Head from 'next/head'
import styled from 'styled-components'
import { playfairDisplay } from '@/styles/fonts'
import Frame from '@/components/Frame'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Work from '@/components/sections/Work'
import GrainFilter from '@/components/GrainFilter'

const StyledAppContainer = styled.div`
`

const StyledMain = styled.main`
  color: ${props => props.theme.main};
  width: 100%;
  box-sizing: border-box;
  padding-left: calc(1vw + 2px);
  padding-right: calc(1vw + 2px);
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
        <StyledMain className={`${playfairDisplay.className}`}>
          <Hero />
          <About />
          <Work />
        </StyledMain>
        <Frame />
        <GrainFilter />
      </StyledAppContainer>
    </>
  )
}
