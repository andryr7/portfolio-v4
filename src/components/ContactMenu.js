import { PortfolioContext } from "@/utils/Context"
import { useContext } from "react"
import { styled } from "styled-components"
import { playfairDisplay } from "@/styles/fonts"


const StyledContactMenu = styled.div`
  position: fixed;
  bottom: -1rem;
  transition: all 0.5s;
  width: calc(100% - 2rem);
  height: calc(10dvh - 1rem);
  z-index: 9;
  box-sizing: border-box;
  margin: 1rem;
  transform: translateY(100%);
  border: 2px inset ${props => props.theme.main};
  display: flex;
  &.opened {
    transform: translateY(0%);
    bottom: 0;
  }
`

const StyledMainLinkCaption = styled.div`
`

const StyledSecondaryLinkCaption = styled.div`
  max-width: 0px;
  overflow: hidden;
  transition: all 0.5s;
  white-space: nowrap;
`

const StyledContactItem = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: ${props => props.theme.main};
  cursor: pointer;
  transition: all 0.5s;
  font-size: 1.5rem;
  line-height: 2rem;
  &:not(:last-of-type) {
    &::after {
      background-color: ${props => props.theme.main};
      width: 2px;
      height: 110%;;
      content: '';
      position: absolute;
      right: 0;
      transform: translateX(50%) rotate(-22.5deg);
    }
  }
  &:hover {
    flex-grow: 2.5;
    & ${StyledMainLinkCaption} {
      text-shadow: ${props => props.theme.orange + '99'} 3px 3px;
    }
    & ${StyledSecondaryLinkCaption} {
      max-width: 350px;
    }
  }
`

export default function ContactMenu() {
  const { contactMenuIsOpened } = useContext(PortfolioContext);

  return(
    <StyledContactMenu className={`${contactMenuIsOpened && 'opened'} ${playfairDisplay.className}`}>
      <StyledContactItem >
        <StyledMainLinkCaption>
          GitHub
        </StyledMainLinkCaption>
        <StyledSecondaryLinkCaption>
          : andryr7
        </StyledSecondaryLinkCaption>
      </StyledContactItem>
      <StyledContactItem >
        <StyledMainLinkCaption>
          LinkedIn
        </StyledMainLinkCaption>
        <StyledSecondaryLinkCaption>
          : andryratsimba
        </StyledSecondaryLinkCaption>
      </StyledContactItem>
      <StyledContactItem >
        <StyledMainLinkCaption>
          Email
        </StyledMainLinkCaption>
        <StyledSecondaryLinkCaption>
          : contact@andryratsimba.com
        </StyledSecondaryLinkCaption>
      </StyledContactItem>
    </StyledContactMenu>
  )
}