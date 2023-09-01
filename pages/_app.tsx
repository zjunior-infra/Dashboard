import '../styles/globals.css'
import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, createTheme } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
})

export default function App({ Component, pageProps }: AppProps) {
  
  return (
  
      <ThemeProvider theme={darkTheme} >
        <Layout >
          <Component {...pageProps}  />
        </Layout>
        <ToastContainer />
      </ThemeProvider>
    
  )
}
