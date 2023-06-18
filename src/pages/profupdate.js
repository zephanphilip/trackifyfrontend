import React, { useState, useEffect } from "react";
import { MDBInput, MDBCheckbox, MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { NavBar } from '../components/navbar';
import { Button } from '@mui/material';
import './profile.css';

export const Profupdate = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();
  const { id } = useParams();

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
  const handleChange = React.useCallback((value) => {
    setInfo(state => ({
        ...state,
        ...value
    }));
}, [setInfo]);

const Update = (e) => {
  e.preventDefault();
  
  const updatedFields = {
    name: info.name,
    email: info.email,
    phoneno: info.phoneno,
    education: info.education,
    age: info.age,
    place: info.place,
  };

  // axios.put(`http://localhost:3001/auth/profileupdate/${id}`, updatedFields)
  axios.put(`/api/auth/profileupdate/${id}`, updatedFields)
    .then(result => {
      console.log(result);
      navigate('/profile');
    })
    .catch(err => console.log(err));
};


  return (
    <div>
      <NavBar />
      
      <h3 style={{fontWeight:"bold",fontFamily:"sans-serif",marginTop:"40px",marginRight:"100px"}}>Update Your Profile</h3>
      <div className="profileform">
      <form className="form" onSubmit={Update}>
        <h5 className="text1">Name:</h5>
        <MDBInput className="mb-4" style={{ width: '300px' }} value={info.name} onChange={(e) => handleChange({ name: e.target.value })} id="form5Example1" />
        <h5 className="text1">Place:</h5>
        <textarea className="mb-4" textarea style={{ width: '300px',height: '90px',marginRight:"500px" }} value={info.place}  onChange={(e) => handleChange({ place: e.target.value })}
                    id="form5Example1" />
        <h5 className="text1">Age:</h5>
        <MDBInput className="mb-4" type="number" style={{ width: '300px' }} value={info.age} onChange={(e) => handleChange({ age: e.target.value })} id="form5Example1" />
        <h5 className="text1">Email address:</h5>
        <MDBInput className="mb-4" type="email" style={{ width: '300px' }} value={info.email} onChange={(e) => handleChange({ email: e.target.value })} id="form5Example2" />

        <h5 className="text1">Phone no.:</h5>
        <MDBInput className="mb-4" type="number" style={{ width: '300px' }} value={info.phoneno} onChange={(e) => handleChange({ phoneno: e.target.value })} id="form5Example1" />
        <h5 className="text1">Education:</h5>
        <MDBInput className="mb-4" value={info.education} style={{ width: '300px',height: '90px',marginRight:"500px" }} onChange={(e) => handleChange({ education: e.target.value })} id="form5Example1" />

          <Button type="submit" variant="outlined" style={{ color: '#027148', borderColor: ' #027148',marginRight:"100px" }} block>
            Save
          </Button>
      </form>
    </div>
    </div>
  );
};
