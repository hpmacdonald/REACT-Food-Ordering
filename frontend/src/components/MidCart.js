import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from '@material-ui/core/Button';


import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const MidCart = ({ }) => {
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart
    const StyledBadge = withStyles((theme) => ({
        badge: {
          right: -3,
          top: 13,
          border: `2px solid ${theme.palette.background.paper}`,
          padding: '0 4px',
        },
      }))(Badge);

    

    return (
        <div className='mid--cart--nav'>
        <Link to='/'>
            <Button 
                className='btn-block'
                variant="outlined" 
                color="secondary">
                Back To Menu
            </Button>
        </Link>
        
        <Link to="/cart" >
            <Button 
            className='btn-block'
            variant="outlined" 
            color="primary" 
            aria-label="cart">
                <IconButton aria-label="cart">
                    <StyledBadge badgeContent={ cartItems.reduce((acc, item) => acc + item.qty, 0)  } color="primary">
                        <ShoppingCartIcon style={{color: 'white'}}/>
                    </StyledBadge>
                </IconButton>                       
            </Button>
        </Link>  
                            
        </div>
    )
}

export default MidCart
