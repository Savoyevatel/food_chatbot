import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import 'font-awesome/css/font-awesome.min.css';
import { logout } from '../actions/userActions'


function Header() {
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }


  return (
    <header>
      <Navbar className="custom-navbar" expand="lg">
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img
                src='/static/images/icon.jpg'
                width="70"
                height="70"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Brand>Food FiniS</Navbar.Brand>


          <Navbar.Toggle aria-controls='basic-navbar-nav' />  
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='mx-auto custom-mid-navbar'>
              <LinkContainer to="/">
                <Nav.Link><i className='fas fa-house custom-nav-link'></i>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/special">
                <Nav.Link><i className='fas fa-bounce fa-fire custom-nav-link'></i>Special</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/menu">
                <Nav.Link><i className='fas fa-bag-shopping custom-nav-link'></i>Menu</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
                <Nav.Link><i className='fas fa-solid fa-phone custom-nav-link'></i>Contact us</Nav.Link>
              </LinkContainer>
            </Nav>
            
            <Nav className='mx-auto custom-right-navbar'>
              <LinkContainer to="/cart">
                <Nav.Link><i className="fas fa-solid fa-burger custom-nav-link"></i>Finish Order?</Nav.Link>
              </LinkContainer>
              
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Log out</NavDropdown.Item>
                </NavDropdown>
              
              ): (
                  <LinkContainer to="/login">
                    <Nav.Link><i className='fas fa-user custom-nav-link'></i>Login</Nav.Link>
                  </LinkContainer>
              )}
              
              
            </Nav>
          </Navbar.Collapse>
          
        </Container>
      </Navbar>
    </header>
  )
}

export default Header