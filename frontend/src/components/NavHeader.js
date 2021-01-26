import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavHeader.css';
import { Navbar, Nav, Container, NavDropdown, Card, Accordion } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';



const NavHeader = () => {
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
  
    const image1 = 'https://images.unsplash.com/photo-1543373072-69f3d4788832?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
      dispatch(logout())
    }
    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton()
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <section>
          <div className='overlay'>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        Online Ordering <i class="fas fa-hamburger"></i>
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-window-close' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                                Menu
                            </Link>  
                        </li>
                        
                        <li className='nav-item'>
                          <Link to="/cart" >
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={ cartItems.reduce((acc, item) => acc + item.qty, 0)  } color="primary">
                                    <ShoppingCartIcon style={{color: 'white'}}/>
                                </StyledBadge>
                            </IconButton>                       
                          </Link>  
                        </li>

                        <li className='nav-item'>
                            <Link to='/login' className="nav-links-mobile" onClick={closeMobileMenu}>
                            <i className='fas fa-user'></i> Sign In
                            </Link>
                        </li>
                        
                        
                  
                        {userInfo ? (
                  
                          <Accordion className='accordion--style'>
                            <Card.Header>
                              <Accordion.Toggle className='accordion--toggle--style' variant="link" eventKey="0">
                              <Button color="primary">{userInfo.name} <ArrowDropDownIcon /> </Button>
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                              <Card.Body>
                                <Link className="nav-links" onClick={closeMobileMenu} to='/profile'> Profile</Link>
                              </Card.Body>
                            </Accordion.Collapse>
                            <Accordion.Collapse eventKey="0">
                              <Card.Body>
                                <Link className="nav-links" onClick={closeMobileMenu} to='/logout' onClick={logoutHandler}> Logout</Link>
                              </Card.Body>
                            </Accordion.Collapse>
                          </Accordion>
                        ) : (
                          <LinkContainer to='/login'>
                            <Nav.Link className="nav-links">
                            { button && <Button variant="contained" color="primary">
                              <a>
                              <i className='fas fa-user'></i> Sign In
                              </a>
                                  </Button>
                              }
                            </Nav.Link>
                          </LinkContainer>
                        )}

                        
                          {userInfo && userInfo.isAdmin && (
                            <Accordion className='accordion--style'>
                              <Card.Header>
                                <Accordion.Toggle className='accordion--toggle--style' variant="link" eventKey="0">
                                <Button color="secondary">Admin <ArrowDropDownIcon /></Button>
                                </Accordion.Toggle>
                              </Card.Header>
                              <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                  <Link className="nav-links" onClick={closeMobileMenu} to='/admin/userlist'>Users</Link>
                                </Card.Body>
                              </Accordion.Collapse>
                              <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                  <Link className="nav-links" onClick={closeMobileMenu} to='/admin/productlist'> Products</Link>
                                </Card.Body>
                              </Accordion.Collapse>
                              <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                  <Link className="nav-links" to='/admin/orderlist'> Orders</Link>
                                </Card.Body>
                              </Accordion.Collapse>
                            
                        </Accordion>
                        )}
                    </ul>
                </div>
            </nav>
            </div>
        </section>
    )
}

export default NavHeader;