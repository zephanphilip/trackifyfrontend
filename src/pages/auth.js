import axios from "axios";
import { useCookies } from "react-cookie";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

export const Auth = () => {
    const [justifyActive, setJustifyActive] = useState("tab1");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState({
        name: '',
        email: '',
        phoneno: '',
        education: '',
        age: '',
        place: '',
    });
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
  
    const handleJustifyClick = (value) => {
      if (value === justifyActive) {
        return;
      }
  
      setJustifyActive(value);
    };
  
    const onSubmitLogin = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post("http://localhost:3001/auth/login", {
          username,
          password,
        });
        console.log(response.data);
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        navigate("/home");
      } catch (err) {
        console.error(err);
      }
    };
  
    const onSubmitRegister = async (event) => {
      event.preventDefault();
      console.log({
        username,
        password,
        ...data,
      });
      try {
        await axios.post("http://localhost:3001/auth/register", {
          username,
          password,
          ...data,
        });
  
        alert("Successfully registered! Now login");
      } catch (err) {
        console.error(err);
      }
    };

    const handleChange = React.useCallback((value) => {
        setData(state => ({
            ...state,
            ...value
        }));
    }, [setData]);

  return (
    <form onSubmit={justifyActive === "tab1" ? onSubmitLogin : onSubmitRegister}>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between"
        >
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab1")}
              active={justifyActive === "tab1"}
            >
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab2")}
              active={justifyActive === "tab2"}
            >
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === "tab1"}>
            <MDBInput
              wrapperClass="mb-4"
              id="username"
              value={username}
              placeholder="Username"
              type="text"
              size="lg"
              onChange={(event) => setUsername(event.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              id="password"
              value={password}
              placeholder="Password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />


            <Button className="mb-4 w-100" type="submit" variant="outlined" >
              Sign in
            </Button>
            <p className="text-center">
              Not a member? <a href="#!"  onClick={() => handleJustifyClick("tab2")}
              active={justifyActive === "tab2"}>Register</a>
            </p>
          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === "tab2"}>
          <MDBInput
              wrapperClass="mb-4"
              value={data.name}
              placeholder="Name"
              id="name"
              type="text"
              onChange={(e) => handleChange({ name: e.target.value })}
            />
            <MDBInput
              wrapperClass="mb-4"
              value={data.place}
              placeholder="Place"
              id="place"
              type="text"
              onChange={(e) => handleChange({ place: e.target.value })}
            />
            <MDBInput
              wrapperClass="mb-4"
              value={data.age}
              placeholder="Age"
              id="age"
              type="number"
              onChange={(e) => handleChange({ age: e.target.value })}
            />
            <MDBInput
              wrapperClass="mb-4"
              value={data.email}
              placeholder="Email id"
              id="emailid"
              type="email"
              onChange={(e) => handleChange({ email: e.target.value })}
            />
            <MDBInput
              wrapperClass="mb-4"
              value={data.phoneno}
              placeholder="Phone no."
              id="phoneno"
              type="number"
              onChange={(e) => handleChange({ phoneno: e.target.value })}
            />
            <MDBInput
              wrapperClass="mb-4"
              value={data.education}
              placeholder="Education"
              id="education"
              type="text"
              multiple
              onChange={(e) => handleChange({ education: e.target.value })}
            />
            <MDBInput
              wrapperClass="mb-4"
              value={username}
              placeholder="Username"
              id="username"
              type="text"
              onChange={(event) => setUsername(event.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              id="password"
              value={password}
              placeholder="Password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className="d-flex justify-content-center mb-4">
              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                label="I have read and agree to the terms"
              />
            </div>

            <Button className="mb-4 w-100" type="submit" variant="outlined">Sign up</Button>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </form>
  );
};
