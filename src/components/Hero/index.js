import { styled } from "styled-components"
import { useContext } from "react";
import { PortfolioContext } from "@/utils/Context";
import { playfairDisplaySC } from "@/styles/fonts";
import ContactCTA from "../Interactivity/ContactCTA";

const StyledHero = styled.section`
  height: 100lvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 1s;
  mix-blend-mode: exclusion;
`

const StyledMainCaption = styled.h2`
  font-size: 10vw;
  letter-spacing: 2vw;
  color: ${props => props.theme.main};
  position: relative;
  top: 0;
    isolation: isolate;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: ${props => props.theme.main};
    margin-left: auto;
    width: 50%;
    height: 90%;
    object-position: bottom right;
    mix-blend-mode: difference;
  }
`

export default function Hero() {
  return (
    <>
      <StyledHero >
        <StyledMainCaption className={playfairDisplaySC.className}>
          Hello There
        </StyledMainCaption>
        {/* <StyledDescriptionContainer>
          <StyledCaption>
            Je m'appelle Andry
          </StyledCaption>
          <StyledCaption>
            Je suis développeur web
          </StyledCaption>
          <StyledCaption>
            Je suis disponible immédiatement
          </StyledCaption>
        </StyledDescriptionContainer> */}
      </StyledHero>
    </>
  )
}