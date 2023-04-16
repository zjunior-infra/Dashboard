import '@/styles/globals.css'
import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material'
import { ThemeProvider as NextThemeProvider } from 'next-themes'


const lightTheme = createTheme({
  palette: {
    mode: 'light',
  }
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
})

export default function App({ Component, pageProps }: AppProps) {
  const {theme, setTheme} = useTheme()
  const [activeTheme, setActiveTheme] = useState(lightTheme)
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    const desiredTheme = selectedTheme === 'light' ? 'dark' : 'light'
    setTheme(desiredTheme)
  }

  useEffect(() => {
    setActiveTheme(selectedTheme === 'light' ? lightTheme : darkTheme)
  }, [selectedTheme])

  return (
    <NextThemeProvider attribute="class" enableSystem={true}>
      <ThemeProvider theme={activeTheme} >
        <Layout toggleTheme={toggleTheme}>
          <Component {...pageProps}  />
        </Layout>
      </ThemeProvider>
    </NextThemeProvider>
  )
}
