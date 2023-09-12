import { styled } from "styled-components"
import { useEffect, useRef, useState, useContext } from "react"
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import { PortfolioContext } from "@/utils/Context"
import Image from "next/image"
import { useNextSanityImage } from "next-sanity-image"
import { sanityClient } from "../../../sanity"
import { useMediaQuery } from "@studio-freight/hamo";
import { useLenis } from "@studio-freight/react-lenis";

const StyledWorkSection = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const StyledInterlude = styled.section`
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledSectionTitle = styled.span`
  font-size: clamp(1.5rem, 4vw, 5rem);
  letter-spacing: 1vw;
`

const StyledContainer = styled.div`
  height: 100lvh;
  width: 100%;
  border-top: 1px solid ${props => props.theme.main};
  background-color: ${props => props.theme.background};
  display: flex;
  align-items: center;
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
    & div {
      opacity: 1;
    }
  }
`

const StyledProjectTitle = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 0;
  transform: translate(-50%, -50%);
  opacity: 0;
  font-size: 1.5rem;
  color: ${props => props.theme.main};
  text-shadow: 1px 1px ${props => props.theme.background};
  background-color: ${props => props.theme.background};
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s;
  @media (max-width: 768px) {
    opacity: 1;
  };
`

function ProjectCard({ project, setCurrentProject }) {
  const [shift, setShift] = useState(50);
  const animated = useRef(false);
  const cardRef = useRef(null);
  const imageProps = useNextSanityImage(sanityClient, project.image);
  const { setProjectPageIsOpened } = useContext(PortfolioContext);
  const lenis = useLenis();

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
    });

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
    });
    
  },[]);

  const handleProjectClick = () => {
    setProjectPageIsOpened(true);
    setCurrentProject(project);
    lenis.stop();
  }

  return (
    <StyledProjectCard onClick={handleProjectClick}>
      <Image
        ref={cardRef}
        src={imageProps.src}
        loader={imageProps.loader}
        fill
        alt={`Image of the ${project.title} project`}
        style={projectImageStyle}
        quality={75}
        sizes="(max-width: 768px) 125vw, (max-width: 1280px) 100vw, (max-width: 1920px) 75vw, 50vw"
        priority
      />
      <StyledProjectTitle>
        {project.title}
      </StyledProjectTitle>
    </StyledProjectCard>
  )
}
 
export default function Work({ projectData, workSectionScroll, setCurrentProject }) {
  const { workSectionRef, isAltLang } = useContext(PortfolioContext);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const sectionTitleStyle = {
    letterSpacing: `${1 + workSectionScroll}vw`
  };

  const noStyle = {};
  
  return (
    <StyledWorkSection ref={workSectionRef}>
      <StyledInterlude >
        <StyledSectionTitle style={isMobile ? noStyle : sectionTitleStyle}>
          {isAltLang ? '{ work }' : '{ projets }'}
        </StyledSectionTitle>
      </StyledInterlude>
      <StyledContainer>
        <StyledCarouselContainer>
          <Splide
            aria-label="Projects carousel" 
            hasTrack={false}
            options={ {
              drag: 'free',
              arrows: true,
              pagination: false,
              perPage: 5,
              lazyLoad: false,
              focus: 'center',
              snap: true,
              trimSpace: false,
              breakpoints: {
                2560: {
                  perPage: 4
                },
                1920: {
                  perPage: 3
                },
                1440: {
                  perPage: 2
                },
                1024: {
                  perPage: 1
                }
              }
            } }
          >
            <SplideTrack>
              {projectData.map((project, index) => (
                <SplideSlide key={project._id}>
                  <ProjectCard project={project} setCurrentProject={setCurrentProject}/>
                </SplideSlide>
              ))}
            </SplideTrack>
          </Splide>
        </StyledCarouselContainer>
      </StyledContainer>
    </StyledWorkSection>
  )
}