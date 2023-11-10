import { store } from '@/store'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import "../styles/global.css"
import { ThemeProvider } from '@mui/material'
import { theme } from '@/utils/theme'
import Snackbar from '@/components/Snackbar'
import Layout from '@/components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <SessionProvider>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <Layout>
      <Component {...pageProps} />
      <Snackbar />
    </Layout>
    </ThemeProvider>
  </Provider>
  </SessionProvider>
  )
}
