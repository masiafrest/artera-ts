import { Image, Box, Text, Heading, SimpleGrid, Container, Stack, IconButton, useBreakpointValue } from '@chakra-ui/react'
import ProductCardList from 'components/products/product-card-list'
import ImageCarousel from 'components/sections/imageCarousel'
import { getAllProducts } from 'lib/services/products-api'
import { ProductDetailInterface } from 'lib/services/types'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

type Props = { products: ProductDetailInterface[] }


const Home: NextPage<Props> = ({ products }) => {
  return (
    < >
      <Head>
        <title>Arterra</title>
        <meta name="description" content="Arterra" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ImageCarousel />
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
