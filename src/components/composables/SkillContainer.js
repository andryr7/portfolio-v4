import { styled } from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useCallback, useContext, useRef, useState } from "react";
import { PortfolioContext } from "@/utils/Context";
import useInView from "@/utils/useInView";
import { lato } from "@/styles/fonts";

const StyledHexContainer = styled.article`
  width: 20vw;
  max-width: 500px;
  aspect-ratio: 0.91;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.main};
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  -webkit-clip-path: polygon(
    50% 0%,
    100% 25%,
    100% 75%,
    50% 100%,
    0% 75%,
    0% 25%
  );
  overflow: hidden;
  transition: background-color 0.5s ease 0s,
    opacity 0.5s ease ${(props) => props.delay + "s"};
  @media (max-width: 768px) {
    width: 61vw;
    transition: background-color 0.5s ease 0s, opacity 0.5s ease 0.5s;
  }
  opacity: 0;
  &.displayed {
    opacity: 1;
  }
  &:hover {
    background-color: ${(props) => props.theme.accent};
  }
`;

const StyledHexContent = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.background};
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  -webkit-clip-path: polygon(
    50% 0%,
    100% 25%,
    100% 75%,
    50% 100%,
    0% 75%,
    0% 25%
  );
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
  &.displayed {
    width: calc(100% - 6px);
    height: calc(100% - 6px);
  }
`;

const StyledHexTitle = styled.h4`
  position: absolute;
  font-size: clamp(1.25rem, 1.5vw, 2rem);
  transition: opacity 0.5s;
  opacity: 1;
  &.displayed {
    opacity: 0;
  }
`;

const StyledSlidercontainer = styled.div`
  transition: opacity 0.5s;
  opacity: 0;
  &.displayed {
    opacity: 1;
  }
`;

const StyledSlide = styled.article`
  height: 100%;
  width: 20vw;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  font-size: clamp(1rem, 1.25vw, 1.5rem);
`;

export default function SkillContainer({ title, skills, delay }) {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const { isAltLang } = useContext(PortfolioContext);
  const isInView = useInView(containerRef, { once: true, threshold: 0.25 });
  const [sliderIsDiplayed, setSliderIsDisplayed] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setSliderIsDisplayed(true);
    sliderRef.current.splide.Components.Autoplay.play();
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSliderIsDisplayed(false);
    sliderRef.current.splide.Components.Autoplay.pause();
  }, []);

  return (
    <StyledHexContainer
      ref={containerRef}
      className={isInView && "displayed"}
      delay={delay}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <StyledHexContent className={sliderIsDiplayed && "displayed"}>
        <StyledHexTitle className={sliderIsDiplayed && "displayed"}>
          {title}
        </StyledHexTitle>
        <StyledSlidercontainer className={sliderIsDiplayed && "displayed"}>
          <Splide
            className={lato.className}
            ref={sliderRef}
            aria-label={`${title} carousel`}
            options={{
              type: "fade",
              rewind: true,
              pauseOnHover: false,
              interval: 1000,
              pagination: false,
              arrows: false,
              breakpoints: {
                768: {
                  width: "60vw",
                },
              },
            }}
          >
            {skills.map((skill) => (
              <SplideSlide key={skill._id}>
                <StyledSlide>
                  {isAltLang ? skill.enName : skill.frName}
                </StyledSlide>
              </SplideSlide>
            ))}
          </Splide>
        </StyledSlidercontainer>
      </StyledHexContent>
    </StyledHexContainer>
  );
}
