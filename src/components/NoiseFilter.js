import styled from 'styled-components'
import { keyframes } from 'styled-components'

const noiseanimation = keyframes`
  0%,to{transform:translate(0)}
  10%{transform:translate(7%,11%)}
  20%{transform:translate(14%,6%)}
  30%{transform:translate(8%,24%)}
  40%{transform:translate(6%,22%)}
  50%{transform:translate(14%,11%)}
  60%{transform:translate(13%)}
  70%{transform:translateY(16%)}
  80%{transform:translate(4%,32%)}
  90%{transform:translate(11%,9%)}
`;

const StyledNoiseFilter = styled.div`
  position: fixed;
  z-index: 10;
  bottom: 0;
  right: 0;
  height: 150%;
  width: 150%;
  animation: ${noiseanimation} 1s steps(10) infinite;
  background-image: url('noise.svg');
  background-size: 100px;
  background-repeat: repeat;
  opacity: .25;
  pointer-events: none;
`

export default function NoiseFilter() {
  return (
    <StyledNoiseFilter/>
  )
}