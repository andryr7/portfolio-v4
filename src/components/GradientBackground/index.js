import { styled, keyframes } from "styled-components"
import { useContext, useState } from "react";
import { PortfolioContext } from "@/utils/Context";

const StyledSection = styled.div`
  transition: all 0.5s;
  transform-origin: bottom left;
  height: 100lvh;
  width: 100%;
  position: fixed;
  background-color: black;
  top: 0;
  overflow: hidden;
  /* filter: invert(); */
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
  animation: ${oscillate} 0.1s linear infinite;
  transform-origin: bottom left;
  position: absolute;
  top: 0;
`

export default function GradientBackground() {
  const [backgroundZoom, setBackgroundZoom] = useState(0);

  const wrapperZoomStyle = {
    transform: `
      scale(calc(1 + 3.5 * ${backgroundZoom}))
    `
  }

  const firstBackgroundStyle = {
    background:`
      radial-gradient(circle at 5% 67%, 
        rgba(8,4,3,1) 0%, 
        rgba(8,4,3,1) 25%, 
        rgba(62,7,5,1) 43%, 
        rgba(165,97,31,1) 51%, 
        rgba(228,225,190,1) 58%, 
        #3c445e 62%, 
        rgba(8,4,3,1) 
        100%)
    `,
    // filter:` blur(10px)`
  }

  return (
    <StyledSection style={wrapperZoomStyle}>
      <StyledBackgroundPart style={firstBackgroundStyle}/>
    </StyledSection>
  )
}