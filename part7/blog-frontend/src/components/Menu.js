import { useLocation } from 'react-router-dom'
import { Nav, Navbar, Container, Button } from 'react-bootstrap';

const Menu = ({ authUser, logOut }) => {
    const location = useLocation()

    return <Navbar bg="light" expand="lg">
        <Container>
            <Nav className="me-auto" activeKey={location.pathname}>
                <Navbar.Brand>Blogs</Navbar.Brand>
                <Nav.Link href="/blogs">blogs</Nav.Link>
                <Nav.Link href="/users">users</Nav.Link>
            </Nav>
            <Navbar.Text>{authUser.username} logged in</Navbar.Text>
            <Button variant="dark" onClick={logOut}>Log out</Button>
        </Container>
    </Navbar>
}

export default Menu
