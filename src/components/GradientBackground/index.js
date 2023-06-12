import { styled, keyframes, useTheme } from "styled-components"
import { useContext, useState } from "react";
import { PortfolioContext } from "@/utils/Context";

const StyledSection = styled.div`
  /* transition: all 0.5s; */
  transform-origin: bottom left;
  height: 100lvh;
  width: 100%;
  position: fixed;
  background-color: ${props => props.theme.background};
  top: 0;
  overflow: hidden;
  /* filter: invert(); */
  z-index: -1;
`

const oscillate = keyframes`
  0% {
    transform: scale(1.001);
  }
  50% {
    transform: scale(1.0021);
  }
  100% {
    transform: scale(1.001);
  }
`;

const StyledBackgroundPart = styled.div`
  height: 100%;
  width: 100%;
  animation: ${oscillate} 100ms ease-in-out infinite;
  position: absolute;
  top: 0;
  filter: blur(50px);
`

export default function GradientBackground() {
  const theme = useTheme();
  const { isDarkMode, backgroundShift } = useContext(PortfolioContext);

  const wrapperZoomStyle = {
    transform: `
      scale(calc(1 + 3.5 * ${backgroundShift}))
    `
  }

  // const darkBackgroundStyle = {
  //   background:`
  //     radial-gradient(circle at 5% 67%, 
  //       ${theme.background} 0%, 
  //       ${theme.background} 20%, 
  //       ${theme.red} 43%, 
  //       ${theme.orange} 51%, 
  //       ${theme.main} 58%, 
  //       ${theme.blue} 62%, 
  //       ${theme.background} 
  //       100%)
  //   `,
  // }

  const darkBackgroundStyle = {
    transformOrigin: 'bottom left',
    background:`
      radial-gradient(circle at 5% 67%, 
        ${theme.background} 0%, 
        ${theme.background} 20%, 
        ${theme.red} 43%, 
        ${theme.orange} 51%, 
        ${theme.main} 65%, 
        ${theme.blue} 75%, 
        ${theme.background} 90%, 
        ${theme.background} 
        100%)
    `,
  }

  const lightBackgroundStyle = {
    transformOrigin: 'top right',
    background:`
      linear-gradient(
        90deg,
        ${theme.background} 0%,
        ${theme.red}55 25%,
        ${theme.background} 50%,
        ${theme.blue}55 75%,
        ${theme.background} 
        100%)
    `,
  }

  const backgroundStyle = isDarkMode ? darkBackgroundStyle : lightBackgroundStyle;

  return (
    <StyledSection style={wrapperZoomStyle}>
      <StyledBackgroundPart style={backgroundStyle}/>
    </StyledSection>
  )
}