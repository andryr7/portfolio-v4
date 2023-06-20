import { styled } from "styled-components"
import slideimg3 from '../../assets/slides/3.jpg'
import slideimg1 from '../../assets/slides/1.jpg'
import slideimg2 from '../../assets/slides/2.jpg'
import slideimg4 from '../../assets/slides/4.jpg'
import slideimg5 from '../../assets/slides/5.jpg'
import { useEffect, useRef, useState, useContext } from "react"

import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import { PortfolioContext } from "@/utils/Context"

const StyledWorkSection = styled.section`
  height: 100lvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  top: 0;
`

const StyledCarouselContainer = styled.div`
  width: 100%;
  height: 50%;
`

const StyledProjectTitle = styled.div`
  position: absolute;
  bottom: 1rem;
  transform: translateX(-100%);
  transition: all 0.5s;
  font-size: 2rem;
  opacity: 0;
`

const StyledProjectCard = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
  clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
  &:hover ${StyledProjectTitle} {
    transform: translateX(2rem);
    opacity: 1;
  }
`

const StyledProjectImage = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  object-fit: cover;
  filter: sepia(1);
  transition: filter 1s;
  &:hover {
    filter: sepia(0);
  }
`

const StyledDummyProjectCard = styled.div`
  background-color: red;
`

const projects = [
  {
    id: 1,
    name: 'projet 1',
    img: slideimg1.src,
  },
  {
    id: 2,
    name: 'projet 2',
    img: slideimg2.src,
  },
  {
    id: 3,
    name: 'projet 3',
    img: slideimg3.src,
  },
  {
    id: 4,
    name: 'projet 4',
    img: slideimg4.src,
  },
  {
    id: 5,
    name: 'projet 5',
    img: slideimg5.src,
  },
]

function ProjectCard( {project }) {
  const [shift, setShift] = useState(50)
  const cardRef = useRef(null)

  const projectImageStyle = {
    objectPosition: `${shift}% center`
  };

  useEffect(() => {
    if(cardRef.current === null) {
      return
    }

    const adjustShift = () => {
      if(cardRef.current === null) {
        return
      };

      const rect = cardRef.current.getBoundingClientRect();
      const elWidth = rect.right - rect.left;
      const min = -elWidth;
      const max = window.innerWidth;
      const shift = ((rect.left + elWidth) / (max - min)) * 100;
      const clampedShift = Math.max((Math.min(shift, 100)), 0);
      setShift(clampedShift);
      window.requestAnimationFrame(adjustShift);
    }

    const projectImageAnimation = window.requestAnimationFrame(adjustShift);

    return (() => {
      window.cancelAnimationFrame(projectImageAnimation);
    })
  }, []);

  return (
    <StyledProjectCard>
      <StyledProjectImage src={project.img} style={projectImageStyle} ref={cardRef}/>
      <StyledProjectTitle>
        {project.name}
      </StyledProjectTitle>
    </StyledProjectCard>
  )
}
 
export default function Work() {
  const { workSectionRef } = useContext(PortfolioContext);
  const [paddingSlideNb, setPaddingSlideNb] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setPaddingSlideNb(0);
        return
      }
      else if (window.innerWidth <= 2160) {
        setPaddingSlideNb(1);
        return
      }
      else {
        setPaddingSlideNb(2);
        return
      }
    }
    handleResize();

    window.addEventListener('resize', handleResize)

    return (() => {
      window.removeEventListener('resize', handleResize);
    })
  }, [])

  return (
    <StyledWorkSection ref={workSectionRef}>
      <StyledCarouselContainer>
        <Splide 
          aria-label="Carousel de mes projets" 
          hasTrack={ false }
          options={ {
            drag: 'free',
            arrows: false,
            pagination: false,
            perPage: 5,
            breakpoints: {
              2160: {
                perPage: 3
              },
              768: {
                perPage: 1
              }
            }
          } }
        >
          <SplideTrack>
            {[...Array(paddingSlideNb)].map((e, i) => (
              <SplideSlide key={i} />
            ))}
            {projects.map((project, index) => (
              <SplideSlide key={project.id}>
                <ProjectCard project={project} />
              </SplideSlide>
            ))}
            {[...Array(paddingSlideNb)].map((e, i) => (
              <SplideSlide key={i} />
            ))}
          </SplideTrack>
        </Splide>
      </StyledCarouselContainer>
    </StyledWorkSection>
  )
}