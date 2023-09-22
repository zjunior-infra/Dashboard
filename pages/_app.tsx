import '../styles/globals.css'
import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, createTheme } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
})

export default function App({ Component, pageProps }: AppProps) {
  
  return (
  
      <ThemeProvider theme={darkTheme} >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Layout >
          <Component {...pageProps}  />
        </Layout>
        </LocalizationProvider>
        <ToastContainer />
      </ThemeProvider>
    
  )
}
