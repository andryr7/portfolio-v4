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
    transform: scale(1.0025);
  }
  100% {
    transform: scale(1.001);
  }
`;

const StyledBackgroundPart = styled.div`
  height: 100%;
  width: 100%;
  animation: ${oscillate} 0.1s linear infinite;
  transform-origin: bottom left;
  position: absolute;
  top: 0;
  filter: blur(50px);
`

export default function GradientBackground() {
  const [backgroundZoom, setBackgroundZoom] = useState(0);
  const theme = useTheme();
  const { isDarkMode } = useContext(PortfolioContext);
  console.log(isDarkMode)

  const wrapperZoomStyle = {
    transform: `
      scale(calc(1 + 4 * ${backgroundZoom}))
    `
  }

  const darkBackgroundStyle = {
    background:`
      radial-gradient(circle at 5% 67%, 
        ${theme.background} 0%, 
        ${theme.background} 25%, 
        ${theme.red} 43%, 
        ${theme.orange} 51%, 
        ${theme.main} 58%, 
        ${theme.blue} 62%, 
        ${theme.background} 
        100%)
    `,
  }

  const lightBackgroundStyle = {
    background:`
      ${theme.background}
    `,
  }

  const backgroundStyle = isDarkMode ? darkBackgroundStyle : lightBackgroundStyle;

  return (
    <StyledSection style={wrapperZoomStyle}>
      <StyledBackgroundPart style={backgroundStyle}/>
    </StyledSection>
  )
}