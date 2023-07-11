import { PortfolioContext } from "@/utils/Context"
import { useContext } from "react"
import { styled } from "styled-components"
import { useTheme } from "styled-components"

const StyledThemeButton = styled.button`
  width: clamp(2rem, 3vw, 4rem);
  aspect-ratio: 1;
  border: none;
  border-radius: 50%;
  background: none;
  pointer-events: all;
  cursor: pointer;
  position: relative;
  &:hover {
    transform: scale(0.9);
  }
`

const StyledSvg = styled.svg`
  transition: all 1s;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &.hidden {
    opacity: 0;
    transform: translateY(150px);
    &.alt {
      transform: translateY(0px) translateX(-150px);
    }
  }
`

export default function ThemeButton() {
  const { isDarkMode, setIsDarkMode } = useContext(PortfolioContext);
  const theme = useTheme();

  const handleClick = () => {
    setIsDarkMode(current => !current);
  };

  return(
    <StyledThemeButton onClick={handleClick}>
      <StyledSvg className={!isDarkMode && 'hidden'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={theme.main}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </StyledSvg>
      <StyledSvg className={`${isDarkMode && 'hidden'} alt`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={theme.main}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </StyledSvg>
    </StyledThemeButton>
  )
}