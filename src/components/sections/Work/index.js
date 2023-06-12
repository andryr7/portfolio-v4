import { styled } from "styled-components"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import slideimg2 from '../../../assets/slides/2.jpg'
import slideimg3 from '../../../assets/slides/3.jpg'
import slideimg1 from '../../../assets/slides/1.jpg'
import slideimg4 from '../../../assets/slides/4.jpg'
import { useEffect, useRef, useState } from "react";

const StyledWorkSection = styled.section`
  height: 100lvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  background-color: red;
  overflow: hidden;
  position: relative;
  top: 0;
`

const StyledProjectsTrack = styled.div`
  display: flex;
  gap: 5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  cursor: grab;
`

const StyledProjectCard = styled.article`
  width: 500px;
  height: 500px;
  background-color: ${props => props.theme.blue};
  user-select: none;
`

export default function Work() {
  const isTracking = useRef(false);
  const mouseDownAt = useRef(0)
  const trackPercentage = useRef(0);
  const [trackPosition, setTrackPosition] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;

    const handleMouseDown = (e) => {
      isTracking.current = true;
      mouseDownAt.current = e.clientX
    }

    const handleMouseUp = (e) => {
      isTracking.current = false;
      trackPercentage.current = trackPosition;
    }

    const handleMouseMove = (e) => {
      if (isTracking.current) {
        const mouseDelta = parseFloat(mouseDownAt.current - e.clientX);
        const maxDelta = window.innerWidth * 1;
        const percentage = (mouseDelta / maxDelta) * 100;
        const newPercentage = Math.min(Math.max((trackPercentage.current + percentage), 0), 100);
        setTrackPosition(newPercentage);
      }
    }

    // const handleMouseMove = (e) => {
    //   if (isTracking.current) {
    //     const mouseDelta = parseFloat(mouseDownAt.current - e.clientX);
    //     const maxDelta = window.innerWidth * 0.75;
    //     const percentage = (mouseDelta / maxDelta) * 100;
    //     const newPercentage = Math.min(Math.max(parseFloat(trackPosition + percentage), 0), 100);
    //     setTrackPosition(newPercentage);
    //   }
    // };

    const handleMouseLeave = (e) => {
      isTracking.current = false;
    }

    track.addEventListener('mousedown', handleMouseDown);
    track.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    // document.addEventListener('mouseleave', handleMouseLeave);

    track.animate({
      transform: `translate(-${trackPosition}%, -50%)`
    }, {duration: 500, fill: "forwards"});

    return (() => {
      track.removeEventListener('mousedown', handleMouseDown);
      track.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      // document.removeEventListener('mouseleave', handleMouseLeave);
    })
  },[trackPosition])

  return (
    <StyledWorkSection >
      <StyledProjectsTrack ref={trackRef}>
        <StyledProjectCard>
          test
        </StyledProjectCard>
        <StyledProjectCard>
          test
        </StyledProjectCard>
        <StyledProjectCard>
          test
        </StyledProjectCard>
        <StyledProjectCard>
          test
        </StyledProjectCard>
        <StyledProjectCard>
          test
        </StyledProjectCard>
      </StyledProjectsTrack>
    </StyledWorkSection>
  )
}