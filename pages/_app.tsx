import type { AppProps } from 'next/app'
import { Box, ChakraProvider, Container, Flex } from '@chakra-ui/react'
import theme from 'theme'
import NavBar from 'components/sections/navBar'

function MyApp({ Component, pageProps }: AppProps) {

  return (<ChakraProvider theme={theme}>
    <NavBar />
    <Box paddingTop={'60px'}>
      <Component {...pageProps} />
    </Box>
  </ChakraProvider>)
}

export default MyApp
