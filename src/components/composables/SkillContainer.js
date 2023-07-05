import { styled } from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useContext, useRef, useState } from 'react'
import { PortfolioContext } from '@/utils/Context'
import useInView from '@/utils/useInView'

const StyledHexContent = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.background};
  background-position: center;
  background-size: cover;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  max-width: 498px;
  -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); 
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  position: relative;
  padding: 1rem;
  box-sizing: border-box;
  &.displayed {
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    background: ${props => props.theme.background};
  }
`

const StyledSlidercontainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s;
  opacity: 0;
  &.displayed {
    opacity: 1;
  }
`

const StyledHexTitle = styled.h4`
  font-size: clamp(1.25rem, 1.5vw, 2rem);
  transition: opacity 0.5s;
  opacity: 1;
  &.displayed {
    opacity: 0;
  }
`

const StyledHexContainer = styled.article`
  width: 20vw;
  max-width: 500px;
  aspect-ratio: .91;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.main};
  -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); 
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  transition: 
    background-color 0.5s ease 0s,
    opacity 0.5s ease ${props => props.delay+'s'}
  ;
  @media (max-width: 768px) {
    width: 61vw;
  };
  opacity: 0;
  &.displayed {
    opacity: 1;
  }
  &:hover {
    background-color: ${props => props.theme.accent};
  }
`

const StyledSkillItem = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
`

export default function SkillContainer({ title, skills, delay, backgroundImage }) {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const { isAltLang } = useContext(PortfolioContext);
  const isInView = useInView(containerRef, {once: true, threshold: 0.25});
  const [sliderIsDiplayed, setSliderIsDisplayed] = useState(false);

  const handleMouseEnter = () => {
    setSliderIsDisplayed(true);
    sliderRef.current.splide.Components.Autoplay.play();
  }

  const handleMouseLeave = () => {
    setSliderIsDisplayed(false);
    sliderRef.current.splide.Components.Autoplay.pause();
  }

  const HexContentStyle = {
    backgroundImage: `url(${backgroundImage.src})`
  }

  return (
    <StyledHexContainer 
      ref={containerRef} 
      className={isInView && 'displayed'} 
      delay={delay}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    > 
      <StyledHexContent className={sliderIsDiplayed && 'displayed'} style={HexContentStyle}>
        <StyledHexTitle className={sliderIsDiplayed && 'displayed'}>
          {title}
        </StyledHexTitle>
        <StyledSlidercontainer className={sliderIsDiplayed && 'displayed'}>
          <Splide
            ref={sliderRef}
            aria-label={`${title} carousel`}
            options={{
              type: 'fade',
              rewind: true,
              pauseOnHover : false,
              interval: 1000,
              pagination: false,
              arrows: false,
            }}
          >
            {skills.map(skill => (
              <SplideSlide key={skill._id}>
                <StyledSkillItem>
                  {isAltLang ? skill.enName : skill.frName}
                </StyledSkillItem>
              </SplideSlide>
            ))}
          </Splide>
        </StyledSlidercontainer>
      </StyledHexContent>
    </StyledHexContainer>
  )
}