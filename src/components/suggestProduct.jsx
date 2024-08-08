import React from 'react'
import ProductList from './productsList'

const suggestProduct = ({suggest}) => {
  return (
      <div><ProductList product={suggest} key={suggest}/> </div>
  )
}

export default suggestProduct