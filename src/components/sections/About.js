import { styled } from "styled-components"
import myPicture from '../../assets/mypicture.jpg'
import { useContext, useEffect, useRef } from "react"
import { PortfolioContext } from "@/utils/Context"
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

const StyledAboutSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  display: flex;
  background-color: ${props => props.theme.background};
  border-top: 1px solid ${props => props.theme.main};
  //TODO Margin for hero section
  margin-top: 100vh;
`

const StyledTopContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10vh 0;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20vw;
  };
`

const StyledImageContainer = styled.div`
  width: 35vw;
  max-width: 1000px;
  border: 1px solid ${props => props.theme.main};
  position: relative;
  top: 0;
  z-index: 0;
  &:hover:before {
    top: -1px;
    left: -1px;
  }
  &:before {
    transition: all 0.5s;
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: -1;
    border: 1px solid ${props => props.theme.main};
  }
  @media (max-width: 768px) {
    width: 70vw;
  };
`;

const StyledImg = styled.img`
  height: 100%;
  width: 100%;
`

const StyledTextContainer = styled.div`
  width: 35vw;
  max-width: 1000px;
  color: ${props => props.theme.main};
  text-align: justify;
  font-size: clamp(1rem, 1.25vw, 2rem);
  @media (max-width: 768px) {
    width: 61vw;
  };
`

const StyledBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  text-align: center;
  line-height: 150%;
  gap: 2.5rem;
  padding: 10vh 0;
  width: 100%;
  border-top: 1px dashed ${props => props.theme.main};
`

const StyledItemCaption = styled.span`
  font-size: 1.5rem;
`

const StyledItemContainer = styled.ul`
  display: flex;
  gap: 10vw;
  @media (max-width: 768px) {
    flex-direction: column;
  };
`

const StyledHexContent = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.background};
  width: calc(20vw - 2px);
  max-width: 498px;
  aspect-ratio: .915;
  -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); 
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  position: relative;
  @media (max-width: 768px) {
    width: calc(61vw - 2px);
  };
`

const StyledHexTitle = styled.h4`
  font-size: clamp(1.25rem, 1.5vw, 2rem);
`

const StyledSlidercontainer = styled.div`
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
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
  transition: all 0.5s;
  &:hover {
    background-color: ${props => props.theme.orange};
    & ${StyledHexContent} {
      width: calc(20vw - 8px);
      @media (max-width: 768px) {
        width: calc(61vw - 8px);
      };
    }
    & ${StyledHexTitle} {
      opacity: 0;
    }
    & ${StyledSlidercontainer} {
      display: flex;
    }
  }
  @media (max-width: 768px) {
    width: 61vw;
  };
`

const StyledSkillItem = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
`

export default function About() {
  const { aboutSectionRef, setBackgroundShift, backgroundShift } = useContext(PortfolioContext);

  const fakeItems = [
    {
      id: 0,
      name: 'congolexicomatisation'
    },
    {
      id: 1,
      name: 'des'
    },
    {
      id: 2,
      name: 'lois'
    },
    {
      id: 3,
      name: 'du'
    },
    {
      id: 4,
      name: 'marché'
    },
    {
      id: 5,
      name: 'propre'
    },
    {
      id: 6,
      name: 'congolais'
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sectionRectTop = aboutSectionRef.current.getBoundingClientRect().top;
      const min = window.innerHeight;
      const max = window.innerHeight * 1;
      const ratio = - (sectionRectTop - min) / max;
      const clampedRatio = Math.min(ratio, 1);
      setBackgroundShift(clampedRatio);
    }

    document.addEventListener('scroll', handleScroll);

    return (() => {
      document.removeEventListener('scroll', handleScroll)
    })
  })

  return (
    <StyledAboutSection ref={aboutSectionRef}>
      <StyledTopContainer>
        <StyledImageContainer>
          <StyledImg src={myPicture.src} />
        </StyledImageContainer>
        <StyledTextContainer>
          Passionné par l’informatique et la résolution de problème depuis l’enfance, je me suis reconverti vers le métier de développeur après plusieurs stages en webmarketing qui m’ont permis de découvrir ce métier. J’ai désormais à coeur de développer des solutions innovantes et créatives pour le web.
        </StyledTextContainer>
      </StyledTopContainer>
      <StyledBottomContainer>
        <StyledItemCaption>
          Domaines de compétence :
        </StyledItemCaption>
        <StyledItemContainer>
          <StyledHexContainer>
            <StyledHexContent>
              <StyledHexTitle>
                Développement frontend
              </StyledHexTitle>
              <StyledSlidercontainer>
                <Splide
                  aria-label="Frontend skills carousel"
                  options={{
                    type: 'fade',
                    rewind: true,
                    autoplay: true,
                    pauseOnHover : false,
                    interval: 1000,
                    pagination: false,
                    arrows: false,
                  }}
                >
                  {fakeItems.map(item => (
                    <SplideSlide key={item.id}>
                      <StyledSkillItem>
                        {item.name}
                      </StyledSkillItem>
                    </SplideSlide>
                  ))}
                </Splide>
              </StyledSlidercontainer>
            </StyledHexContent>
          </StyledHexContainer>
          <StyledHexContainer>
            <StyledHexContent>
              <StyledHexTitle>
                Développement backend
              </StyledHexTitle>
              <StyledSlidercontainer>
                <Splide
                  aria-label="Backend skills carousel"
                  options={{
                    type: 'fade',
                    rewind: true,
                    autoplay: true,
                    pauseOnHover : false,
                    interval: 1000,
                    pagination: false,
                    arrows: false,
                  }}
                >
                  {fakeItems.map(item => (
                    <SplideSlide key={item.id}>
                      <StyledSkillItem>
                        {item.name}
                      </StyledSkillItem>
                    </SplideSlide>
                  ))}
                </Splide>
              </StyledSlidercontainer>
            </StyledHexContent>
          </StyledHexContainer>
          <StyledHexContainer>
            <StyledHexContent>
              <StyledHexTitle>
                Gestion de projet
              </StyledHexTitle>
              <StyledSlidercontainer>
                <Splide
                  aria-label="Project management skills carousel"
                  options={{
                    type: 'fade',
                    rewind: true,
                    autoplay: true,
                    pauseOnHover : false,
                    interval: 1000,
                    pagination: false,
                    arrows: false,
                  }}
                >
                  {fakeItems.map(item => (
                    <SplideSlide key={item.id}>
                      <StyledSkillItem>
                        {item.name}
                      </StyledSkillItem>
                    </SplideSlide>
                  ))}
                </Splide>
              </StyledSlidercontainer>
            </StyledHexContent>
          </StyledHexContainer>
        </StyledItemContainer>
      </StyledBottomContainer>
    </StyledAboutSection>
  )
}