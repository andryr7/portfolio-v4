import Head from 'next/head'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import obiwan from '../assets/obiwan.gif'
import { playfairDisplay } from '@/styles/fonts'
import GrainFilter from '@/components/GrainFilter'
import { useContext } from 'react'
import { PortfolioContext } from '@/utils/Context'

const StyledAppContainer = styled.div`
  width: 100;
  height: 100vh;
  background-color: ${props => props.theme.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.main};
  gap: 1rem;
`

export default function Home() {
  const { isAltLang } = useContext(PortfolioContext);

  return (
    <>
      <Head>
        <title>Andry Ratsimba - Développeur web</title>
        <meta name="description" content="Portfolio de Andry Ratsimba, développeur web fullstack basé à Toulouse" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <noscript>
          <span>Merci d&apos;activer Javascript pour consulter ce site.</span>
        </noscript>
      </Head>
      <StyledAppContainer className={`${playfairDisplay.className}`}>
          <Image alt={`Image animée d'Obi-wan kenobi`} src={obiwan} />
          <span>{isAltLang ? `This isn't the page you are looking for` : `Ceci n'est pas la page que vous recherchez`}</span>
          <Link href="/">{isAltLang ? `Let's go home` : `Retour à l'accueil`}</Link>
      </StyledAppContainer>
      <GrainFilter />
    </>
  )
}