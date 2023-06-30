import { styled } from 'styled-components';
import { useContext } from 'react';
import { PortfolioContext } from '@/utils/Context';

const StyledLanguageButton = styled.div`
  cursor: pointer;
  pointer-events: auto;
  box-sizing: content-box;
  text-align: center;
  line-height: 3rem;
  font-size: 1.5rem;
  color: ${props => props.theme.main};
`;

export default function LangButton() {
  const { isAltLang, setIsAltLang } = useContext(PortfolioContext);

  const handleLanguageButtonClick = () => {
    setIsAltLang(current => !current)
  }

  return (
    <StyledLanguageButton onClick={handleLanguageButtonClick}>
      {isAltLang ? 'FR' : 'EN'}
    </StyledLanguageButton>
  )
}
