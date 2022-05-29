import { Button, useColorMode, Image, Box, Text, Heading, SimpleGrid } from '@chakra-ui/react'
import ProductCard from 'components/products/product-card'
import type { NextPage } from 'next'
import Head from 'next/head'


const Home: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    < >
      <Head>
        <title>Arterra</title>
        <meta name="description" content="Arterra" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box height='80vh' width='100%' position='relative' >
        <Image src='/images/vasijas_hero.webp' alt='vasijas_hero' height='100%' width='100%'
          objectFit={'cover'}
        />
        <Box position={'absolute'} top='50%' left='50%' transform='translate(-50%, -50%)' >
          <Heading size={'4xl'} >
            Artera
          </Heading>
        </Box>
      </Box>
      <SimpleGrid minChildWidth={'400px'} spacing='40px>'>
        <ProductCard productDetails={{
          img: '/images/vasija_card.webp',
          description: 'una vasija', price: 10, oldPrice: 20
        }} />
        <ProductCard productDetails={{
          img: '/images/vasija_card.webp',
          description: 'una vasija', price: 10
        }} />
      </SimpleGrid>
    </>
  )
}

export default Home
