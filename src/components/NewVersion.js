import styled from "styled-components";
import { lato } from "@/styles/fonts";
import { useContext } from "react";
import { PortfolioContext } from "@/utils/Context";

const StyledNewVersionWarning = styled.div`
  display: block;
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  z-index: 10;
  color: red;
  transform: translateX(-50%) translateY(-10%);
  transition: all 1s;
  color: ${(props) => props.theme.main};
`;

export function NewVersion() {
  const { isAltLang } = useContext(PortfolioContext);
  return (
    <StyledNewVersionWarning className={lato.className}>
      {isAltLang ? "New version coming soon" : "Portfolio en cours de refonte"}
    </StyledNewVersionWarning>
  );
}
