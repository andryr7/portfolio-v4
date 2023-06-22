import { styled, keyframes, useTheme } from "styled-components"
import { useContext } from "react"
import { PortfolioContext } from "@/utils/Context"

const StyledSection = styled.div`
  height: 100lvh;
  width: 100%;
  position: fixed;
  background-color: ${props => props.theme.background};
  top: 0;
  overflow: hidden;
  z-index: -1;
`

const StyledBackground = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
`

export default function GradientBackground() {
  const theme = useTheme();
  const { isDarkMode, backgroundShift } = useContext(PortfolioContext);

  // const darkBackgroundStyle = {
  //   transformOrigin: 'bottom left',
  //   background:`
  //     radial-gradient(circle at 14% 55%, 
  //       ${theme.background} 0%, 
  //       ${theme.background} ${15 + (backgroundShift * 100)}%, 
  //       ${theme.red} ${35 + (backgroundShift * 100)}%, 
  //       ${theme.orange} ${45 + (backgroundShift * 100)}%, 
  //       ${theme.main} ${53 + (backgroundShift * 100)}%, 
  //       ${theme.blue} ${75 + (backgroundShift * 100)}%, 
  //       ${theme.background} ${95 + (backgroundShift * 100)}%, 
  //       ${theme.background} 
  //       100%)
  //   `,
  // }

  const darkBackgroundStyle = {
    transformOrigin: 'bottom left',
    background:`
      radial-gradient(circle at -10% 75%, 
        ${theme.background} 0%, 
        ${theme.background} ${30 + (backgroundShift * 100)}%, 
        ${theme.red} ${45 + (backgroundShift * 100)}%, 
        ${theme.orange} ${50 + (backgroundShift * 100)}%, 
        ${theme.main} ${55 + (backgroundShift * 100)}%, 
        ${theme.blue} ${65 + (backgroundShift * 100)}%, 
        ${theme.background} ${95 + (backgroundShift * 100)}%, 
        ${theme.background} 
        100%)
    `,
  }

  const lightBackgroundStyle = {
    transformOrigin: 'bottom left',
    background:`
      radial-gradient(circle at 0% 57%, 
        ${theme.background} 0%,
        ${theme.background} ${15 + (backgroundShift * 100)}%, 
        #FEE7A7 ${30 + (backgroundShift * 100)}%,
        #F6B98A ${45 + (backgroundShift * 100)}%,
        #546E93 100%)
    `,
  }

  return (
    <StyledSection>
      <StyledBackground style={isDarkMode ? darkBackgroundStyle : lightBackgroundStyle}/>
    </StyledSection>
  )
}