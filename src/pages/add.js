import './add.css';
import axios from "axios";
import { NavBar } from '../components/navbar';
import React,{useState} from 'react';
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';

export const Add = () => {

    const [loginRegisterActive, setLoginRegisterActive] = React.useState('Income');
    const handleLoginRegisterClick = (tab) => {
        setLoginRegisterActive(tab);
    };

        const userID = useGetUserID();
        const [cookies, _] = useCookies(["access_token"]);
        const [incomeinfo, setIncomeinfo] = useState({
          iamount: '',
          idescription: "",
          userOwner: userID,
        });
        const [expenseinfo, setExpenseinfo] = useState({
            eamount: '',
            edescription: "",
            userOwner: userID,
          });
        const handleChange = React.useCallback((value) => {
            setIncomeinfo(state => ({
                ...state,
                ...value,
            }));
        }, [setIncomeinfo]);
        const handleChange2 = React.useCallback((value) => {
            setExpenseinfo(state => ({
                ...state,
                ...value,
            }));
        }, [setExpenseinfo]);

          const handleSubmit = async (event) => {
            event.preventDefault();
            try {
              await axios.post("http://localhost:3001/add/incomeadd",
                { ...incomeinfo },
                {
                  headers: { authorization: cookies.access_token },
                }
              );
        
              alert("income added successfully");
            } catch (error) {
              console.error(error);
            }
          };
          const handleSubmit2 = async (event) => {
            event.preventDefault();
            try {
              await axios.post("http://localhost:3001/add/expenseadd",
                { ...expenseinfo },
                {
                  headers: { authorization: cookies.access_token },
                }
              );
        
              alert("expense added successfully");
            } catch (error) {
              console.error(error);
            }
          };

    return (
        <div >
        <NavBar/>
        <div className='add'>
        <MDBTabs pills justify className='mb-3'>
            <MDBTabsItem>
            <MDBTabsLink
                onClick={() => handleLoginRegisterClick('Income')}
                active={loginRegisterActive === 'Income'}
            >
                Income
            </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
            <MDBTabsLink
                onClick={() => handleLoginRegisterClick('Expense')}
                active={loginRegisterActive === 'Expense'}
            >
                Expense
            </MDBTabsLink>
            </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
            <MDBTabsPane show={loginRegisterActive === 'Income'}>
            <form method='Post' onSubmit={handleSubmit}>
                {/* Income */}
                <MDBInput 
                onChange={e => handleChange({ iamount: e.target.value })} 
                value={incomeinfo.iamount}
                label='Amount' 
                name='iamount' 
                className='mb-3' 
                type='number' 
                id='form7Example1'/>
                <MDBInput 
                className='mb-3' 
                onChange={e => handleChange({ idescription: e.target.value })}  
                value={incomeinfo.idescription} 
                type='text' 
                name='idescription' 
                id='form7Example2' 
                label='Description' />
                <Button  type='submit' >
                ADD
                </Button>

            </form>
            </MDBTabsPane>
            <MDBTabsPane show={loginRegisterActive === 'Expense'}>
            <form method='Post' onSubmit={handleSubmit2}>
                {/* Income */}
                <MDBInput 
                onChange={e => handleChange2({ eamount: e.target.value })} 
                value={expenseinfo.iamount}
                label='Amount' 
                name='eamount' 
                className='mb-3' 
                type='number' 
                id='form7Example1'/>
                <MDBInput 
                className='mb-3' 
                onChange={e => handleChange2({ edescription: e.target.value })}  
                value={expenseinfo.edescription} 
                type='text' 
                name='edescription' 
                id='form7Example2' 
                label='Description' />
                <Button  type='submit' className='mb-3' >
                ADD
                </Button>

            </form>
            </MDBTabsPane>
        </MDBTabsContent>
        </div>
        </div>
    
    );

};

