import { styled, useTheme } from 'styled-components';
import { useCallback, useContext } from 'react';
import { PortfolioContext } from '@/utils/Context';

const StyledLanguageButton = styled.button`
  cursor: pointer;
  pointer-events: all;
  width: clamp(1.75rem, 2.75vw, 3.75rem);
  aspect-ratio: 1;
  position: relative;
  &:hover {
    transform: scale(0.9);
  }
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  border: none;
  background: none;
  font-family: inherit;
  color: ${props => props.theme.main};
`;

export default function LangButton() {
  const { isAltLang, setIsAltLang } = useContext(PortfolioContext);
  const theme = useTheme();

  const handleLanguageButtonClick = useCallback(() => {
    setIsAltLang(current => !current)
  },[setIsAltLang]);

  return (
    <StyledLanguageButton onClick={handleLanguageButtonClick} aria-label="Change language">
      {isAltLang ? 'FR' : 'EN'}
    </StyledLanguageButton>
  )
}
