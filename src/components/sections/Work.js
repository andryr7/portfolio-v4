import { styled } from "styled-components"
import { useEffect, useRef, useState, useContext } from "react"
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import { PortfolioContext } from "@/utils/Context"
import Image from "next/image"
import { useNextSanityImage } from "next-sanity-image"
import { sanityClient } from "../../../sanity"

const StyledWorkSection = styled.section`
  height: 100lvh;
  display: flex;
  align-items: center;
  border-top: 1px solid ${props => props.theme.main};
  background-color: ${props => props.theme.background};
`

const StyledCarouselContainer = styled.div`
  width: 100%;
  cursor: grab;
`

const StyledProjectCard = styled.a`
  display: block;
  position: relative;
  width: 100%;
  height: 50vh;
  clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
  transition: filter 0.5s;
  cursor: pointer;
  @media (min-width: 768px) {
    filter: grayscale(1);
  };
  &:hover {
    filter: grayscale(0);
  }
`

function ProjectCard({ project }) {
  const [shift, setShift] = useState(50);
  const animated = useRef(false);
  const cardRef = useRef(null);
  const imageProps = useNextSanityImage(sanityClient, project.image);

  const projectImageStyle = {
    objectPosition: `${shift}% center`,
    objectFit: "cover"
  };

  useEffect(() => {
    if(cardRef.current === null) {
      return
    }

    let animationId;
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          animated.current = true;
          animationId = window.requestAnimationFrame(adjustShift);
        }
        else {
          animated.current = false;
          window.cancelAnimationFrame(animationId);
        }
      })
    })

    observer.observe(cardRef.current);

    const adjustShift = () => {
      if(cardRef.current === null || animated.current === false) {
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

    return (() => {
      window.cancelAnimationFrame(animationId);
    })
  }, []);

  return (
    <StyledProjectCard target="_blank" rel="noopener noreferrer" href={project.url}>
      <Image
        ref={cardRef}
        src={imageProps.src}
        fill
        alt={`Image of the ${project.title} project`}
        style={projectImageStyle}
        quality={100}
        sizes="(max-width: 768px) 150vw, 100vw"
      />
    </StyledProjectCard>
  )
}
 
export default function Work({ projectData }) {
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
          aria-label="Projects carousel" 
          hasTrack={ false }
          options={ {
            drag: 'free',
            arrows: false,
            pagination: false,
            perPage: 5,
            lazyLoad: false,
            focus: 'center',
            breakpoints: {
              2160: {
                perPage: 3
              },
              768: {
                perPage: 1,
                snap: true,
              }
            }
          } }
        >
          <SplideTrack>
            {[...Array(paddingSlideNb)].map((e, i) => (
              <SplideSlide key={i} />
            ))}
            {projectData.map((project, index) => (
              <SplideSlide key={project._id}>
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