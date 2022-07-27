import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './MainNavbar.module.css';

const MainNavbar = () => {
    return (
        <Navbar className={styles.navbar} bg="light" expand="lg">
            <Container>
                <Navbar.Brand>Bicycle Stories</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link className={styles.link} as={Link} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link className={styles.link} as={Link} to="/users">
                            Users
                        </Nav.Link>
                        <Nav.Link className={styles.link} as={Link} to="/stories">
                            Stories
                        </Nav.Link>
                        <Nav.Link className={styles.link} as={Link} to="/stories/new">
                            Edit story/New Story
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Nav className="ms-auto">
                    <Button>Sign in/Register</Button>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default MainNavbar;