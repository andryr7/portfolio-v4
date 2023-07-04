import { styled } from "styled-components"
import { useContext, useEffect, useRef } from "react"
import { PortfolioContext } from "@/utils/Context"
import '@splidejs/react-splide/css'

const StyledAboutSection = styled.section`
  width: 100%;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledSectionTitle = styled.span`
  font-size: clamp(2rem, 5vw, 10rem);
  letter-spacing: 1vw;
`

export default function Interlude() {
  const { isAltLang } = useContext(PortfolioContext);

  return (
    <StyledAboutSection>
      <StyledSectionTitle>
        {isAltLang ? 'work' : 'projets'}
      </StyledSectionTitle>
    </StyledAboutSection>
  )
}