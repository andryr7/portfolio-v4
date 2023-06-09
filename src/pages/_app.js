import { useContext } from 'react'
import { PortfolioProvider, PortfolioContext } from '@/utils/Context'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '@/styles/themes'
import '@/styles/reset.css'
import '@/styles/globals.css'

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

  return (
    <ThemeProvider theme={usedTheme}>
      {children}
    </ThemeProvider>
  )
}
