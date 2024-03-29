import { PortfolioContext } from "@/utils/Context";
import { useCallback, useContext } from "react";
import { styled, useTheme, keyframes } from "styled-components";
import { useLenis } from "@studio-freight/react-lenis";

const flash = keyframes`
  from {
    cursor: pointer;
    opacity: 0;
  }
  to {
    cursor: pointer;
    opacity: 1;
  }
`;

const StyledSvg = styled.svg`
  opacity: 0;
  animation: ${flash} 2s ease 3.5s infinite;
`;

export default function ScrollButton() {
  const { workSectionRef } = useContext(PortfolioContext);
  const theme = useTheme();
  const lenis = useLenis();

  const handleClick = useCallback(() => {
    lenis.scrollTo(workSectionRef.current, { lerp: 0.05 });
  }, [lenis, workSectionRef]);

  return (
    <StyledSvg
      xmlns="http://www.w3.org/2000/svg"
      fill={theme.main}
      height="48"
      viewBox="0 -960 960 960"
      width="48"
      onClick={handleClick}
    >
      <path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z" />
    </StyledSvg>
  );
}
