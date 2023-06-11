import React from 'react';
import { NavBar } from '../components/navbar';
import { Button } from '@mui/material';
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBadge, MDBBtn } from 'mdb-react-ui-kit';


import {useNavigate} from 'react-router-dom';
export const Home = () => {
    const navigate = useNavigate();
    const add = () => {
        navigate("/add")
      }
    return(
      
      <div >
        <NavBar/>
        <Button onClick={add} style={{marginLeft:'1000px',transform: 'scale(1)', transition: 'none'}} type='submit' variant="outlined"  >ADD</Button>
            <MDBContainer  >
      <section  >
        <div className='shadow-4 rounded-5 overflow-hidden' fluid >
          <MDBTable >
            <MDBTableHead light>
              
              <tr>
                <th>Expense </th>
                <th>Income</th>
                <th>Actions</th>
              </tr>
            </MDBTableHead>
            {/* {(() =>( */}
            <MDBTableBody style={{ verticalAlign: 'middle' }}>
              <tr>
                <td>
                      <p className='fw-bold mb-1'>10000</p>
                </td>
                <td>
                      <p className='fw-bold mb-1'>15000</p>
                </td>
                <td>
                
                <Button variant="outlined" style={{color: '#027148' ,borderColor: ' #027148' }} >Edit</Button>
                  <Button variant="outlined" color="error" style={{ marginLeft: '10px' }}>Delete</Button>
                </td>
              </tr>
            </MDBTableBody>

            {/* ))} */}
          </MDBTable>
          <p className='fw-bold '>Total Income: </p>
          <p className='fw-bold '>Total Expense: </p>
          <p className='fw-bold '>Current Balance: </p>
        </div>
      </section>
    </MDBContainer>
    </div>

    )
};