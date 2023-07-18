import { PortfolioContext } from '@/utils/Context'
import { useContext } from 'react'
import styled from 'styled-components'
import { keyframes } from 'styled-components'

const noiseanimation = keyframes`
  0%,to{transform:translate(0)}
  10%{transform:translate(-5%,-10%)}
  20%{transform:translate(-15%,10%)}
  30%{transform:translate(5%,-15%)}
  40%{transform:translate(-5%,15%)}
  50%{transform:translate(-15%,10%)}
  60%{transform:translate(15%,-5%)}
  70%{transform:translate(10%,10%)}
  80%{transform:translate(5%,15%)}
  90%{transform:translate(-10%,5%)}
`;

const StyledNoiseFilter = styled.div`
  position: fixed;
  z-index: 10;
  top: -25%;
  left: -25%;
  height: 150lvh;
  width: 150%;
  animation: ${noiseanimation} 0.5s step-end infinite;
  /* background-image: ${props => props.theme=="dark" ? 'url(/darknoise.png)' : 'url(/lightnoise.png)'}; */
  background-size: 100px;
  background-repeat: repeat;
  opacity: .25;
  pointer-events: none;
`

export default function NoiseFilter() {
  const { isDarkMode } = useContext(PortfolioContext);

  const filterStyle = {
    backgroundImage: isDarkMode ? 'url(/darknoise.png)' : 'url(/lightnoise.png)'
    // backgroundColor: `${isDarkMode ? 'red' : 'blue'}`,
  }

  return (
    <StyledNoiseFilter style={filterStyle}/>
  )
}