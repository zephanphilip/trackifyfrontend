import React, { useState, useEffect } from 'react';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import { Button } from '@mui/material';
import { useGetUserID } from "../hooks/useGetUserID";
import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from '../components/navbar';

export const Updateincome = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userID = useGetUserID();
  const [iamount, setIamount] = useState();
  const [idescription, setIdescription] = useState();

  useEffect(() => {
    // axios.get(`http://localhost:3001/add/income/${id}`)
    axios.get(`/api/add/income/${id}`)
      .then(result => {
        console.log(result);
        setIamount(result.data.iamount);
        setIdescription(result.data.idescription);
      })
      .catch(error => console.log(error));
  }, [id]);

  const Update = (e) => {
    e.preventDefault();
    // axios.put(`http://localhost:3001/add/incomeupdate/${id}`, { iamount, idescription })
    axios.put(`/api/add/incomeupdate/${id}`, { iamount, idescription })
      .then(result => {
        console.log(result);
        navigate('/home');
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <NavBar/>
      
      <div className="ueform" style={{paddingRight:"40px",paddingLeft:"40px",paddingTop:"20px"}}>
      <Form className="ueform" onSubmit={Update}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Your Income</Form.Label>
          <Form.Control type="number" value={iamount} onChange={(e) => setIamount(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" value={idescription} onChange={(e) => setIdescription(e.target.value)} rows={3} />
        </Form.Group>
        <Button type="submit" variant="outlined" style={{ color: '#027148', borderColor: ' #027148' }}>
          Update Income
        </Button>
      </Form>
    </div>
    </div>
  );
};
