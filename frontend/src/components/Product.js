import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import Button from '@material-ui/core/Button';

const Product = ({ product }) => {
  return (
    <Card className='my-3 back--color p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong style={{ color: '#4050b5'}}>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
        <Button
          type='button'
          className='btn-block'
          variant="outlined" color="primary"
        >Add To Cart</Button>
      </Card.Body>
    </Card>
  )
}

export default Product
