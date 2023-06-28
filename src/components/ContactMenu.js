import { PortfolioContext } from "@/utils/Context"
import { useContext, useEffect, useRef, useState } from "react"
import { styled } from "styled-components"
import { playfairDisplay } from "@/styles/fonts"

// Assets imports
import linkedindarklogo from '../assets/contact/linkedindark.png'
import linkedinlightlogo from '../assets/contact/linkedinlight.png'
import githubdarklogo from '../assets/contact/githubdark.png'
import githublightlogo from '../assets/contact/githublight.png'

// Form handling imports
import ReCAPTCHA from "react-google-recaptcha"
import emailjs from '@emailjs/browser'
import { emailJSSettings } from '../../emailjs'
import { useDisableBodyScroll } from "@/utils/useDisableBodyScroll"

const StyledContactMenu = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  top:0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: -1;
  pointer-events: all;
  pointer-events: none;
  opacity: 0;
  transition: all 0.5s;
  &.opened {
    opacity: 1;
    pointer-events: all;
  };
  backdrop-filter: blur(100px);
  -webkit-backdrop-filter: blur(100px);
  @media (max-width: 768px) {
    background-color: ${props => props.theme.background};
    transition: none;
  };
`

const StyledSectionTitle = styled.div`
  position: absolute;
  top: 0;
  font-size: 2rem;
  transform: translateX(-100%) rotate(-90deg);
`

const StyledContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: min(600px, 90vw);
  position: relative;
`

const StyledContactLinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledContactLink = styled.a`
  width: 30%;
`

const StyledContactLogo = styled.img`
  width: 100%;
  transition: all 0.5s;
  filter: drop-shadow(0px 0px ${props => props.theme.orange});
  &:hover {
    filter: drop-shadow(5px 5px ${props => props.theme.orange});
  };
`

const StyledFormContainer = styled.div`
  position: relative;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const StyledSeparator = styled.hr`
  width: 100%;
  color: ${props => props.theme.main};
`

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  letter-spacing: 1.2px;
  box-sizing: border-box;
  border: none;
  border: 1px solid ${props => props.theme.main};
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.main};
  &:focus {
    outline: none !important;
    border-color: ${props => props.theme.orange};
  };
`

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 10rem;
  max-width: 1500px;
  padding: 1rem;
  font-size: 1rem;
  letter-spacing: 1.2px;
  box-sizing: border-box;
  margin: 0;
  resize: vertical;
  border: 1px solid ${props => props.theme.main};
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.main};
  &:focus {
    outline: none !important;
    border-color: ${props => props.theme.orange};
  }
  @media (max-width: 768px) {
    height: 5rem;
  };
`

const StyledFormActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-height: 0px;
  transition: all 0.5s;
  flex-wrap: wrap;
  overflow: hidden;
  &.displayed {
    max-height: 150px;
    overflow: unset;
  }
`

const StyledSendButton = styled.button`
  height: 100%;
  background-color: ${props => props.theme.main};
  padding: 1rem 2rem;
  box-sizing: border-box;
  color: ${props => props.theme.background};
  font-size: 2rem;
  border: 1px solid ${props => props.theme.main};
  cursor: pointer;
  transition: all 0.52s;
  &:hover {
    background-color: ${props => props.theme.orange};
    border-color: ${props => props.theme.background};
  };
`

export default function ContactMenu() {
  const { contactMenuIsOpened } = useContext(PortfolioContext);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const { isDarkMode } = useContext(PortfolioContext);
  const recaptchaRef = useRef(null);
  const formIsValid = formName && /\S+@\S+\.\S+/.test(formEmail) && formMessage;

  // Disabling body scroll when the contact menu is opened
  useDisableBodyScroll(contactMenuIsOpened);
  
  const getTemplateParams = () => {
    return {
      name: formName,
      email: formEmail,
      message: formMessage,
      'g-recaptcha-response': recaptchaRef.current.getValue(),
    };
  };
  
  const handleNameChange = (event) => {
    setFormName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setFormEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setFormMessage(event.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formIsValid) {
      emailjs.send(emailJSSettings.serviceId, emailJSSettings.templateId, getTemplateParams(), emailJSSettings.publicKey)
        .then(() => {
          setFormName('');
          setFormEmail('');
          setFormMessage('');
          recaptchaRef.current.reset();
        }, (err) => {
          window.alert("Oups ! Une erreur est survenue. Je vais tenter d'y remédier au plus vite");
        });
    }
  }

  return(
    <StyledContactMenu className={contactMenuIsOpened && 'opened'}>
      <StyledContactContainer>
        <StyledContactLinksContainer>
          <StyledContactLink href='linkedin.com'>
            <StyledContactLogo src={isDarkMode ? linkedinlightlogo.src : linkedindarklogo.src} />
          </StyledContactLink>
          <StyledContactLink href='github.com'>
            <StyledContactLogo src={isDarkMode ? githublightlogo.src : githubdarklogo.src} />
          </StyledContactLink>
        </StyledContactLinksContainer>
        <StyledSeparator />
        <StyledFormContainer>
          <StyledSectionTitle >
            contact
          </StyledSectionTitle>
          <StyledForm>
            <StyledInput 
              type="text" 
              name="name" 
              value={formName} 
              placeholder='Votre nom *' 
              onChange={handleNameChange}
              className={`${playfairDisplay.className}`}
            />
            <StyledInput 
              type="text" 
              name="email" 
              value={formEmail} 
              placeholder='Votre e-mail *' 
              onChange={handleEmailChange}
              className={`${playfairDisplay.className}`}
            />
            <StyledTextArea 
              type="text" 
              name="message" 
              value={formMessage} 
              placeholder='Votre message *' 
              onChange={handleMessageChange}
              className={`${playfairDisplay.className}`}
            />
            <StyledFormActionsContainer className={formIsValid && 'displayed'}>
              <ReCAPTCHA
                sitekey={emailJSSettings.reCaptchaSiteKey}
                ref={recaptchaRef}
              />
              <StyledSendButton onClick={handleFormSubmit} className={`${playfairDisplay.className}`}>
                Envoyer
              </StyledSendButton>
            </StyledFormActionsContainer>
          </StyledForm>
        </StyledFormContainer>
      </StyledContactContainer>
    </StyledContactMenu>
  )
}