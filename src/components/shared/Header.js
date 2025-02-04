import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}
const authenticatedOptions = (
	<>
		<Nav.Item style={{ marginRight: '15px' }}>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item style={{ marginRight: '15px' }}> 
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
		<Nav.Item style={{ marginRight: '15px' }}>
			<Link to='sign-up' style={linkStyle}>Sign Up</Link>
		</Nav.Item>
		<Nav.Item style={{ marginRight: '15px' }}>
			<Link to='sign-in' style={linkStyle}>Sign In</Link>
		</Nav.Item>
		<Nav.Item style={{ marginRight: '15px' }}>
			<Link to='calorie-counter' style={linkStyle}>Count Calories</Link>
		</Nav.Item>
	</>
);

const alwaysOptions = (
	<>
		<Nav.Item style={{ marginRight: '15px' }}>
			<Link to='/' style={linkStyle}>Home</Link>
		</Nav.Item>
		<Nav.Item style={{ marginRight: '15px' }}>
			<Link to='/calorie-counter' style={linkStyle}>Calorie Counter</Link>
		</Nav.Item>
	</>
);

const Header = ({ user }) => (
	<Navbar bg='primary' variant='dark' expand='md'>
		<Navbar.Brand>
			<Link to='/' style={linkStyle}> Calorie & Nutrition </Link>
		</Navbar.Brand>

		<Navbar.Toggle aria-controls='basic-navbar-nav' />

		<Navbar.Collapse id='basic-navbar-nav'>

			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.email}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>

	</Navbar>
);

export default Header;


