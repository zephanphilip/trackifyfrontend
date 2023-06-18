import React, { useEffect, useState } from 'react';
import axios from "axios";
import { NavBar } from '../components/navbar';
import { Button } from '@mui/material';
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBadge, MDBBtn } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useGetUserID } from "../hooks/useGetUserID";

export const Home = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();
  const add = () => {
    navigate('/add');
  };
  const updateincome = () => {
    navigate('/updateincome');
  };
  const updateexpense = () => {
    navigate('/updateexpense');
  };
  const [incomeinfo, setIncomeinfo] = useState([]);
  useEffect(() => {
    // axios.get('http://localhost:3001/add/incomeget')
    axios.get('/api/add/incomeget')
    .then(resulti => {
      // Filter income information by comparing the user ID
      const filteredIncome = resulti.data.filter(income => income.userOwner === userID);
      setIncomeinfo(filteredIncome);
    })
    .catch(error => console.error(error));
  }, [])

  const [expenseinfo, setExpenseinfo] = useState([]);
  useEffect(() => {
    // axios.get('http://localhost:3001/add/expenseget')
    axios.get('/api/add/expenseget')
      .then(resulte => {
        // Filter expense information by comparing the user ID
        const filteredExpense = resulte.data.filter(expense => expense.userOwner === userID);
        setExpenseinfo(filteredExpense);
      })
      .catch(error => console.error(error));
  }, [])

  const handleDelete1 = (id) => {
    // axios.delete('http://localhost:3001/add/incomedel/'+id)
    axios.delete('/api/add/incomedel/'+id)
    .then(res=> {console.log(res)
      window.location.reload();
    })
    .catch(err  => console.log(err))
  };
  const handleDelete2 = (id) => {
    // axios.delete('http://localhost:3001/add/expensedel/'+id)
    axios.delete('/api/add/expensedel/'+id)
    .then(res=> {console.log(res)
    window.location.reload();
    })
    .catch(err  => console.log(err))
  };
    // Calculate the total income
    const totalIncome = incomeinfo.reduce((total, income) => total + Number(income.iamount), 0);

    // Calculate the total expense
    const totalExpense = expenseinfo.reduce((total, expense) => total + Number(expense.eamount), 0);
  
    // Calculate the current balance
    const currentBalance = totalIncome - totalExpense;

  return (
    <div>
      <NavBar />
      <p style={{marginLeft:"5px",marginTop:"9px",fontSize:"40px", color: "#0084FE", fontFamily:"sans-serif", fontWeight: "bold" }}>Overview</p>
      <div style={{display:"flex",paddingRight:"230px",justifyContent: 'flex-end'}}>
      <Button onClick={add} style={{ marginBottom:"10px",  transform: 'scale(1)', transition: 'none' }} type="submit" variant="outlined">
        ADD Income/Expense
      </Button>
      </div>
      <MDBContainer style={{ display: 'flex' }}>
        <section style={{ flex: '1', marginRight: '50px' }}>
          <div className="shadow-4 rounded-5 overflow-hidden">
            <MDBTable>
              <MDBTableHead light>
                <tr>
                  <th>Income</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody style={{ verticalAlign: 'middle' }}>
                {incomeinfo.map((income) => (
                  <tr key={income.id}>
                    <td>
                      <p className="fw-bold mb-1">{income.iamount}</p>
                    </td>
                    <td>
                      <p className="fw-bold mb-1">{income.idescription}</p>
                    </td>
                    <td>
                      <Link to={`/updateincome/${income._id}`} ><Button  variant="outlined" style={{ color: '#027148', borderColor: ' #027148' }}>
                        Edit
                      </Button></Link>
                      <Button onClick={(e) => handleDelete1(income._id)} variant="outlined" color="error" style={{ marginLeft: '10px' }}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                <p className="fw-bold">Total Income:{totalIncome}</p>
              </MDBTableBody>
            </MDBTable>
          </div>
        </section>
        <section style={{ flex: '1', marginLeft: '10px' }}>
          <div className="shadow-4 rounded-5 overflow-hidden">
            <MDBTable>
              <MDBTableHead light>
                <tr>
                  <th>Expense</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody style={{ verticalAlign: 'middle' }}>
                {expenseinfo.map((expense) => (
                  <tr key={expense.id}>
                    <td>
                      <p className="fw-bold mb-1">{expense.eamount}</p>
                    </td>
                    <td>
                      <p className="fw-bold mb-1">{expense.edescription}</p>
                    </td>
                    <td>
                    <Link to={`/updateexpense/${expense._id}`} ><Button  variant="outlined" style={{ color: '#027148', borderColor: ' #027148' }}>
                        Edit
                      </Button></Link>
                      <Button onClick={(e) => handleDelete2(expense._id)} variant="outlined" color="error" style={{ marginLeft: '10px' }}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                <p className="fw-bold">Total Expense:{totalExpense}</p>
              </MDBTableBody>
            </MDBTable>
          </div>
        </section>
      </MDBContainer>
      
      
      <p className="fw-bold">Current Balance:{currentBalance}</p>
    </div>
  );
};

























