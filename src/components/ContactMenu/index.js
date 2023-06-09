import { PortfolioContext } from "@/utils/Context"
import { useContext } from "react"
import { styled } from "styled-components"
import LinkedInIcon from '../../assets/linkedin.png'
import GitHubIcon from '../../assets/github-mark-white.svg'
import EmailIcon from '../../assets/email.png'

const StyledContactMenuContainer = styled.section`
  position: fixed;
  bottom: 0;
  background-color: ${props => props.theme.red};
  height: 10lvh;
  width: 100%;
  transition: all 0.5s;
  transform: translateY(10lvh);
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  box-sizing: border-box;
  &.opened {
    transform: translateY(0);
  }
`

const StyledContactMenuContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`

const StyledCloseButton = styled.div`

`

const StyledContactLink = styled.a`
  display: block;
  width: 75px;
  height: 75px;
`

const StyledImg = styled.img`
  width: 75px;
  height: 75px;
`

export default function ContactMenu() {
  const { contactMenuIsOpened, setContactMenuIsOpened} = useContext(PortfolioContext);

  return (
    <StyledContactMenuContainer className={`${contactMenuIsOpened && 'opened'}`}>
      <StyledContactMenuContent>
        <StyledContactLink href='linkedin.com'>
          <StyledImg src={LinkedInIcon.src} />
        </StyledContactLink>
        <StyledContactLink href='github.com'>
          <StyledImg src={GitHubIcon.src} />
        </StyledContactLink>
        <StyledContactLink href='email.com'>
          <StyledImg src={EmailIcon.src} />
        </StyledContactLink>
      </StyledContactMenuContent>
      <StyledCloseButton />
    </StyledContactMenuContainer>
  )
}