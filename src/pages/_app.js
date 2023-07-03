import { useContext, useEffect } from 'react'
import { PortfolioProvider, PortfolioContext } from '@/utils/Context'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '@/styles/themes'
import '@/styles/reset.css'
import '@/styles/globals.css'
import { Lenis as ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

//TODO if not a react component Next.js error import React from "react"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  // Enables scrolltriger markers etc
  ScrollTrigger.defaults({ markers: process.env.NODE_ENV === 'development' })

  // merge rafs
  gsap.ticker.lagSmoothing(0)
  gsap.ticker.remove(gsap.updateRoot)

  // reset scroll position
  window.scrollTo(0, 0)
  window.history.scrollRestoration = 'manual'
}

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
  const lenis = useLenis(({scroll}) => {ScrollTrigger.update})
  // useEffect(ScrollTrigger.refresh, [lenis]);

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
