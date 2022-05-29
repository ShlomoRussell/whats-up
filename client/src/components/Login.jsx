import React, { createRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();

  let navigate = useNavigate();
  let location = useLocation()

  let auth = useAuth();

  let from = location.state|| "/";

  const handleSubmit = (e) => {
    
    e.preventDefault();
    auth.signin(
      { username: emailRef.current.value, password: passwordRef.current.value },
      () => {
        navigate(from, { replace: true });
      }
    );
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          ref={passwordRef}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Button variant="primary" onClick={(e) => handleSubmit(e)} type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Login;
