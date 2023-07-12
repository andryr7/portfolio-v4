import { styled, useTheme } from 'styled-components';
import { useContext } from 'react';
import { PortfolioContext } from '@/utils/Context';

const StyledLanguageButton = styled.div`
  cursor: pointer;
  pointer-events: all;
  width: clamp(1.75rem, 2.75vw, 3.75rem);
  aspect-ratio: 1;
  position: relative;
  &:hover {
    transform: scale(0.9);
  }
`;

const StyledSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
  &.rotated {
    transform: rotate(180deg);
  }
`

export default function LangButton() {
  const { isAltLang, setIsAltLang } = useContext(PortfolioContext);
  const theme = useTheme();

  const handleLanguageButtonClick = () => {
    setIsAltLang(current => !current)
  };

  return (
    <StyledLanguageButton onClick={handleLanguageButtonClick}>
      <StyledSvg className={isAltLang && 'rotated'} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" fill={theme.main}>
        <path d="M480-80q-84 0-157-31.5T196-197q-54-54-85-127.5T80-482q0-84 31-156.5T196-765q54-54 127-84.5T480-880q84 0 157 30.5T764-765q54 54 85 126.5T880-482q0 84-31 157.5T764-197q-54 54-127 85.5T480-80Zm0-58q35-36 58.5-82.5T577-331H384q14 60 37.5 108t58.5 85Zm-85-12q-25-38-43-82t-30-99H172q38 71 88 111.5T395-150Zm171-1q72-23 129.5-69T788-331H639q-13 54-30.5 98T566-151ZM152-391h159q-3-27-3.5-48.5T307-482q0-25 1-44.5t4-43.5H152q-7 24-9.5 43t-2.5 45q0 26 2.5 46.5T152-391Zm221 0h215q4-31 5-50.5t1-40.5q0-20-1-38.5t-5-49.5H373q-4 31-5 49.5t-1 38.5q0 21 1 40.5t5 50.5Zm275 0h160q7-24 9.5-44.5T820-482q0-26-2.5-45t-9.5-43H649q3 35 4 53.5t1 34.5q0 22-1.5 41.5T648-391Zm-10-239h150q-33-69-90.5-115T565-810q25 37 42.5 80T638-630Zm-254 0h194q-11-53-37-102.5T480-820q-32 27-54 71t-42 119Zm-212 0h151q11-54 28-96.5t43-82.5q-75 19-131 64t-91 115Z"/>
      </StyledSvg>
    </StyledLanguageButton>
  )
}
