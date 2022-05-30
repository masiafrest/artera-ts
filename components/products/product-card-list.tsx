import { SimpleGrid, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { ProductDetailInterface } from 'lib/services/types'
import React from 'react'
import ProductCard from './product-card'

type Props = { products: ProductDetailInterface[] }

export default function ProductCardList({ products }: Props) {
  return (
    <SimpleGrid minChildWidth={'400px'} spacing='40px>'>
      {products.map(product => {
        const { Imagen, Descripcion, Precio, OldPrice, SKU } = product
        return (
          <ProductCard key={`${SKU}-${Descripcion}`} productDetails={{
            SKU,
            Imagen,
            Descripcion, Precio, OldPrice
          }} />

        )
      }
      )}
    </SimpleGrid>
  )
}
