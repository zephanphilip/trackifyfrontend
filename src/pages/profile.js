import React, { useState, useEffect } from "react";
import { MDBInput, MDBCheckbox, MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import './profile.css'
import { NavBar } from '../components/navbar';

import { Button } from '@mui/material';

export const Profile = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    name: "",
    email: "",
    phoneno: "",
    education: "",
    age: "",
    place: ""
  });

  useEffect(() => {
    axios
      // .get("http://localhost:3001/auth/profile")
      .get("/api/auth/profile")
      .then(result => {
        // Filter income information by comparing the user ID
        const filteredInfo = result.data.filter(info => info._id === userID);
        setInfo(filteredInfo[0]); // Assuming there will be only one matching info object
        console.log(filteredInfo);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <NavBar />
      <h3 style={{fontWeight:"bold",fontFamily:"sans-serif",marginTop:"40px",marginRight:"100px"}}>Your Profile</h3>
      <div className="profileform">
        
      <form className="form">
        <h5 className="text1">Name:</h5>
        <MDBInput className="mb-4 " style={{ width: '300px'  }} value={info.name} id="form5Example1" />
        <h5 className="text1">Place:</h5>
        <textarea className="mb-4 " textarea style={{ width: '300px',height: '90px',marginRight:"500px"  }} value={info.place} id="form5Example1" />
      
        <h5 className="text1">Age:</h5>
        <MDBInput className="mb-4 custom-input" type="number" style={{ width: '300px'}} value={info.age} id="form5Example1" />
       <h5 className="text1">Email address:</h5>
        <MDBInput className="mb-4 custom-input" type="email" style={{ width: '300px'}}value={info.email} id="form5Example2" />
        <h5 className="text1">Phone no.:</h5>
        <MDBInput className="mb-4 custom-input" style={{ width: '300px' }} type="number" value={info.phoneno} id="form5Example1" />
        
        <h5 className="text1">Education:</h5>
        <textarea className="mb-5" style={{ width: '300px',height: '90px',marginRight:"500px" }} value={info.education} id="form5Example1" />
        <Link to={`/profupdate/${info._id}`}>
          <Button type="submit" variant="outlined" style={{ color: '#027148', borderColor: ' #027148',marginRight:"100px" }}block>
            Edit
          </Button>
        </Link>
      </form>
      </div>
    </div>
  );
};
