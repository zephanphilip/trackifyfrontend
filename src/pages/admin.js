
import axios from "axios";
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBadge, MDBBtn } from 'mdb-react-ui-kit';
import { NavBar } from '../components/navbar';

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import '../components/navbar.css';
import React, { useState,useEffect } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';


const pages = ['Home'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
export const Admin = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(['access_token']);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


    const [info, setInfo] = useState([]);
    const logout = () => {
      navigate("/");
      window.location.reload();
  }

  
    useEffect(() => {
      axios
        // .get("http://localhost:3001/auth/profile")
        .get("/api/auth/profile")
        
        .then(result => setInfo(result.data))
        .catch(error => console.error(error));
    }, []);

    const handleDelete1 = (id) => {
        // axios.delete('http://localhost:3001/auth/profile/'+id)
        axios.delete('/api/auth/profile/'+id)
        .then(res=> {console.log(res)
          window.location.reload();
          alert("User deleted successfully");
        })
        .catch(err  => console.log(err))
      };
  
    return (
      <div>
            {/* <div className="navbarr">
              
      
            <p style={{marginLeft:"10px",marginTop:"9px", color: "#0084FE", fontFamily:"sans-serif", fontWeight: "bold" }}>TRACKIFY</p>
            <Link style={{marginTop:"9px",marginLeft:"1540px",textDecoration: 'none', color: 'inherit',fontFamily:"sans-serif", fontWeight: "bold"}} className="mb-3" onClick={logout}>Logout</Link>
        </div> */}
        <AppBar position="static">
      <Toolbar disableGutters>
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          TRACKIFY
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component={Link}
          to=""
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          TRACKIFY
        </Typography>


        {!cookies.access_token ? (<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              key={page}
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link}
              to={'/' + page.toLowerCase()}
            >
              
            </Button>
          ))}</Box>): (<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              key={page}
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link}
              to={'/' + page.toLowerCase()}
            >
              
            </Button>
          ))}
        </Box>)}

        <Box style={{paddingRight:"10px"}} sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
              <MenuItem onClick={logout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>





        <p style={{marginLeft:"5px",marginTop:"9px",fontSize:"40px", color: "#0084FE", fontFamily:"sans-serif", fontWeight: "bold" }}>ADMIN DASHBOARD</p>
      
        <section style={{ flex: "1", marginRight: "10px" }}>
          <div className="shadow-4 rounded-5 overflow-hidden">
            <MDBTable>
              <MDBTableHead light>
                <tr>
                  <th>Name</th>
                  <th>username</th>
                  <th>Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody style={{ verticalAlign: "middle" }}>
                {info &&
                  info.map(user => (
                    <tr key={user.id}>
                      <td>
                        <p className="fw-bold mb-1">{user.name}</p>
                      </td>
                      <td>
                        <p className="fw-bold mb-1">{user.username}</p>
                      </td>
                      <td>
                        <Button onClick={(e) => handleDelete1(user._id)} variant="outlined" color="error" style={{ marginLeft: '10px' }}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </MDBTableBody>
            </MDBTable>
          </div>
        </section>
      </div>
    );
  };
  