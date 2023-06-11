import React, { useState } from 'react';
import { Button } from '@mui/material';
import './startup.css';
import LoginIcon from '@mui/icons-material/Login';
import {useNavigate} from 'react-router-dom';
export const Startup = () => {
    const navigate = useNavigate();
    const auth = () => {
        navigate("/auth")
      }
    return(
        <div className='Startup'>
            <div className='div1' >
            <h1 className='text'>YOURS DAILY EXPENSE TRACKER</h1>
            </div>
            <div >
            <Button onClick={auth} variant="text" style={{color:'#95BDFF'}}>Login/Register</Button>
                </div>
        </div>
    )
}