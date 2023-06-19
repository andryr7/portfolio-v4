import { styled } from "styled-components"

const StyledIconContainer = styled.div`
  background-color: blue;
`

export default function EmailIcon() {
  return (
    <StyledIconContainer>
      <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
        <path d="M137-145q-28.725 0-50.862-22.137Q64-189.275 64-218v-524q0-28.725 22.138-50.862Q108.275-815 137-815h686q28.725 0 50.862 22.138Q896-770.725 896-742v524q0 28.725-22.138 50.863Q851.725-145 823-145H137Zm343-306 343-222v-69L480-522 137-742v69l343 222Z"/>
      </svg>
    </StyledIconContainer>
  )
}