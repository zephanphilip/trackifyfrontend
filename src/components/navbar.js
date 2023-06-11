import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import './navbar.css'
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';


export const NavBar = () => {
  const navigate = useNavigate();

  const [cookies, setCookies] = useCookies(['access_token'])
  const logout = () => {
    setCookies("access_token","")
    window.localStorage.removeItem('userID')
    navigate("/")
  }
    
  // return <div className="navbar">
  //     <Link to="/"> Home </Link>
  //     <Link to="/create-recipie"> Create Recipie </Link>
  //     <Link to="/saved-recipie"> Saved Recipi </Link>
  //     <Link to="/auth"> Login/Register </Link>
  // </div>
  return (
<div className="navbar">
  <Navbar expand="lg" >
    <Container className="cf">
      {/* <Navbar.Brand href="/">Recipie Time</Navbar.Brand> */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-3">
          <p style={{marginTop:"9px", color: "#95BDFF",
    fontFamily:"sans-serif",
    fontWeight: "bold"}}>EXPENSETRACKER</p>
          <Nav.Link href="/home" style={{marginLeft:"30px"}}>Home</Nav.Link>
          <PersonIcon style={{marginLeft:"1310px",marginTop:"10px"}}/>
          {!cookies.access_token ? (<Nav.Link className="login-logout" style={{backgroundColor:"none"}} href="/auth">Login/Register</Nav.Link>) : (<Nav.Link  style={{backgroundColor:"none"}} className="mb-3" onClick={logout}>Logout</Nav.Link>)}
          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
</div>

  );
};
