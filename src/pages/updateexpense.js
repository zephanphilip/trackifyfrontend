import React, { useEffect, useState } from 'react';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import { Button } from '@mui/material';
import { useGetUserID } from "../hooks/useGetUserID";
import { useParams, useNavigate } from "react-router-dom";
import { NavBar } from '../components/navbar';

export const Updateexpense = () => {
  const { id } = useParams();
  const userID = useGetUserID();
  const navigate = useNavigate();

  const [eamount, setEamount] = useState();
  const [edescription, setEdescription] = useState();

  useEffect(() => {
    // axios.get(`http://localhost:3001/add/expense/${id}`)
    axios.get(`/api/add/expense/${id}`)
      .then(result => {
        console.log(result);
        setEamount(result.data.eamount);
        setEdescription(result.data.edescription);
      })
      .catch(error => console.log(error));
  }, [id]);

  const Update = (e) => {
    e.preventDefault();
    // axios.put(`http://localhost:3001/add/expenseupdate/${id}`, { eamount, edescription })
    axios.put(`/api/add/expenseupdate/${id}`, { eamount, edescription })
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
      <Form  onSubmit={Update}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Your Expense</Form.Label>
          <Form.Control type="number" value={eamount} onChange={(e) => setEamount(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" value={edescription} onChange={(e) => setEdescription(e.target.value)} rows={3} />
        </Form.Group>
        <Button type='submit' variant="outlined" style={{ color: '#027148', borderColor: ' #027148' }}>
          Update Expense
        </Button>
      </Form>
      </div>
    </div>
  );
};


