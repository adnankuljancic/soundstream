import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./LogIn.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState,useContext } from "react";
import UserContext from '../../context/UserContext';
import jwt_decode from 'jwt-decode';

export const LogIn = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {userData,setUserData}=useContext(UserContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
      const credentials = {
        email: email,
        password: password,
      };

       axios.post("http://localhost:3001/users/login", credentials)
      .then(res=>{
        const token=res.data;
        console.log(token);
        localStorage.setItem("token",token);
        const decoded=jwt_decode(token);
        localStorage.setItem("userId",decoded.userId);
        setUserData({
          fullName:decoded.fullName,
          userId:decoded.userId,
          token:token
        });
        navigate("/");
      }).catch(error=>{
        console.log(error.response.data.error);
      });

  };

  return (
    <div className="container" id="loginContainer">
      <h1 className="my-5 text-center">Log in to SoundStream</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
        </Form.Group>
        <div className="d-grid gap-2">
        <Button variant="primary" type="submit">
          Submit
        </Button>
        </div>
      </Form>
    </div>
  );
};
