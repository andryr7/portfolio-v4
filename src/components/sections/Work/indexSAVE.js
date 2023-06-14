import { styled } from "styled-components"
import slideimg2 from '../../../assets/slides/2.jpg'
import slideimg3 from '../../../assets/slides/3.jpg'
import slideimg1 from '../../../assets/slides/1.jpg'
import slideimg4 from '../../../assets/slides/4.jpg'
import { useEffect, useRef, useState } from "react";
import workBackground from '../../../assets/workbackground.svg'

const StyledWorkSection = styled.section`
  height: 100lvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  top: 0;
  /* background:
    ${props => props.theme.background}; */
  background-size: cover;
  background-position: center;
`

const StyledProjectsTrack = styled.div`
  display: flex;
  gap: 1vw;
  position: absolute;
  top: 50%;
  left: 50%;
  cursor: grab;
  width: calc(auto - 25vw);
`

const StyledProjectCard = styled.article`
  width: 35vw;
  height: 50vh;
  background-color: ${props => props.theme.blue};
  user-select: none;
  clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
`

const StyledProjectImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  user-select: none;
`

const StyledBeforeProjectsCaption = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-100%, -50%);
  font-size: 1.5rem;
`

const StyledAfterProjectsCaption = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(100%, -50%);
  font-size: 1.5rem;
`

export default function Work() {
  const isTracking = useRef(false);
  const mouseDownAt = useRef(0)
  const trackPercentage = useRef(0);
  const [trackPosition, setTrackPosition] = useState(0);
  const trackRef = useRef(null);

  const projectImage1Ref = useRef(null)
  const projectImage2Ref = useRef(null)
  const projectImage3Ref = useRef(null)
  const projectImage4Ref = useRef(null)

  const projectImageStyle = {
    objectPosition: `${trackPosition}% center`
  }

  useEffect(() => {
    const track = trackRef.current;

    const handleMouseDown = (e) => {
      isTracking.current = true;
      mouseDownAt.current = e.clientX
    }

    const handleMouseUp = (e) => {
      mouseDownAt.current = 0;
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

    track.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    track.animate({
      transform: `translate(-${trackPosition}%, -50%)`
    }, {duration: 500, fill: "forwards"});

    return (() => {
      track.removeEventListener('mousedown', handleMouseDown);
      track.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    })
  },[trackPosition]);

  return (
    <StyledWorkSection >
      <StyledProjectsTrack ref={trackRef}>
        <StyledBeforeProjectsCaption>
          Découvrez mes projets :
        </StyledBeforeProjectsCaption>
        <StyledProjectCard>
          <StyledProjectImg src={slideimg1.src} draggable='false' ref={projectImage1Ref} style={projectImageStyle}/>
        </StyledProjectCard>
        <StyledProjectCard>
          <StyledProjectImg src={slideimg2.src} draggable='false' ref={projectImage2Ref} style={projectImageStyle}/>
        </StyledProjectCard>
        <StyledProjectCard>
          <StyledProjectImg src={slideimg3.src} draggable='false' ref={projectImage3Ref} style={projectImageStyle}/>
        </StyledProjectCard>
        <StyledProjectCard>
          <StyledProjectImg src={slideimg4.src} draggable='false' ref={projectImage4Ref} style={projectImageStyle}/>
        </StyledProjectCard>
        <StyledAfterProjectsCaption>
          N'hésitez pas à me contacter
        </StyledAfterProjectsCaption>
      </StyledProjectsTrack>
    </StyledWorkSection>
  )
}