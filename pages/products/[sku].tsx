import { getAllProducts } from 'lib/services/products-api'
import staticPathDataToProps from 'lib/services/static-path-data-to-props'
import { ProductDetailInterface } from 'lib/services/types'
import type { GetStaticProps, GetStaticPaths } from 'next'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'
import { ParsedUrlQuery } from 'querystring'
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import React from 'react'

interface Query extends ParsedUrlQuery {
  sku: string
}

type Props = { product: ProductDetailInterface }

export default function Product({ product }: Props) {
  const { Descripcion, Imagen, SKU, Precio, OldPrice } = product
  return (
    <Container>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Flex>
          <Image
            rounded={'md'}
            alt={'product image'}
            src={
              `${Imagen || '/images/vasija_card.webp'}`
            }
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: 'xl', sm: '4xl', lg: '5xl' }}>
              {Descripcion}
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}>
              {Precio}
            </Text>
            <Text
              color={useColorModeValue('gray.500', 'gray.400')}
              fontSize={'md'}
              fontWeight={'300'}>
              SKU: {SKU}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Product Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Medidas:
                  </Text>{' '}
                  20 mm
                </ListItem>

              </List>
            </Box>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Cuidados a cosiderar
              </Text>
              <Text fontSize={'lg'}>
                {Descripcion}
              </Text>
            </Box>
          </Stack>

          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}>
            Add to cart
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={'center'}>
            <MdLocalShipping />
            <Text>7 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const products = await getAllProducts()
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    await staticPathDataToProps.cache.set(products)
  } else {
    await staticPathDataToProps.cache.set(products)
  }

  return {
    paths: products.map((product) => ({
      params: {
        sku: product.SKU,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
  let product = await staticPathDataToProps.cache.get(params?.sku as string)

  if (!product) {
    product = await staticPathDataToProps.fetch(params?.id as string)
  }

  if (!product) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      product,
    },
  }
}