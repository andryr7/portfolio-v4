import { useContext } from 'react'
import { PortfolioProvider, PortfolioContext } from '@/utils/Context'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '@/styles/themes'
import '@/styles/reset.css'
import '@/styles/globals.css'
//TODO if not a react component Next.js error import React from "react"

import { Lenis as ReactLenis, useLenis } from '@studio-freight/react-lenis'

export default function App({ Component, pageProps }) {
  return (
    <PortfolioProvider>
      <AppWithPortfolioContext>
        <Component {...pageProps}/>
      </AppWithPortfolioContext>
    </PortfolioProvider>
  )
}

function AppWithPortfolioContext({ children }) {
  const { isDarkMode } = useContext(PortfolioContext);
  const usedTheme = isDarkMode ? darkTheme : lightTheme;
  const lenis = useLenis(({scroll}) => {
    // called every scroll
  })

  const options = {
    lerp: 0.1,
  }

  return (
    <ThemeProvider theme={usedTheme}>
      <ReactLenis root options={{ ...options }}>
        {children}
      </ReactLenis>
    </ThemeProvider>
  )
}
