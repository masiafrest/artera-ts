import type { AppProps } from 'next/app'
import { Box, ChakraProvider, Container, Flex } from '@chakra-ui/react'
import theme from 'theme'
import NavBar from 'components/sections/navBar'

function MyApp({ Component, pageProps }: AppProps) {

  return (<ChakraProvider theme={theme}>
    <NavBar />
    <Component {...pageProps} />
  </ChakraProvider>)
}

export default MyApp
