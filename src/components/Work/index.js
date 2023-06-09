import { styled } from "styled-components"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import slideimg1 from '../../assets/slides/1.jpg'
import slideimg2 from '../../assets/slides/2.jpg'
import slideimg3 from '../../assets/slides/3.jpg'
import slideimg4 from '../../assets/slides/4.jpg'
import { useEffect, useRef, useState } from "react";

const StyledWorkSection = styled.section`
  height: 100lvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
`

const StyledSliderContainer = styled.div`
  width: 100%;
  height: 500px;
  background-color: ${props => props.theme.red};
`

const StyledSlide = styled.div`
  width: 50vw;
  height: 500px;
  background-color: blue;
  background-image: url(${props => props.img});
  transition: all 1s;
  background-position: 50% 50%;
`

export default function Work() {
  const splideRef = useRef(null)

  useEffect(() => {
    splideRef.current.splide.Components.Move.getPosition();
  });

  return (
    <StyledWorkSection >
      <StyledSliderContainer>
        <Splide 
          options={ { 
            rewind: true,   
            type   : 'loop',
            drag   : 'free',
            // snap   : true,
            perPage: 3, }
          }
          ref={splideRef}
          aria-label="React Splide Example"
        >
          <SplideSlide>
            <StyledSlide img={slideimg1.src}>
              Test Slide 1
            </StyledSlide>
          </SplideSlide>
          <SplideSlide>
            <StyledSlide img={slideimg2.src}>
              Test Slide 2
            </StyledSlide>
          </SplideSlide>
          <SplideSlide>
            <StyledSlide img={slideimg3.src}>
              Test Slide 3
            </StyledSlide>
          </SplideSlide>
          <SplideSlide>
            <StyledSlide img={slideimg4.src}>
              Test Slide 4
            </StyledSlide>
          </SplideSlide>
        </Splide>
        
      </StyledSliderContainer>
    </StyledWorkSection>
  )
}