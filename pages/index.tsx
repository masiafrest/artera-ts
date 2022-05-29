import { Image, Box, Text, Heading, SimpleGrid } from '@chakra-ui/react'
import ProductCardList from 'components/products/product-card-list'
import { getAllProducts } from 'lib/services/products-api'
import { ProductDetailInterface } from 'lib/services/types'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

type Props = { products: ProductDetailInterface[] }

const Home: NextPage<Props> = ({ products }) => {
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
            arterra
          </Heading>
        </Box>
      </Box>
      <ProductCardList products={products} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getAllProducts()
  return {
    props: {
      products
    }
  }
}

export default Home
