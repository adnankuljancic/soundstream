import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap';
import {useState,useEffect,useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import UserContext from '../../context/UserContext';

export const MainNavBar = () => {
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const {userData, setUserData}=useContext(UserContext);
  const navigate=useNavigate();

  useEffect(() => {
    console.log(userData);
    
  }, [userData]);

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">SoundStream</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            
            {userData!=null && (
              <LinkContainer to="/liked-songs">
                <Nav.Link>My Songs</Nav.Link>
              </LinkContainer>
            )}
            {userData!=null ? (
              <>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                <Nav.Link>{userData.fullName}</Nav.Link>

              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Log In</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
