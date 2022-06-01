import React, { createRef } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import authentication from "../helpers/auth.helper";

function Login({onSubmitId}) {
  const usernameRef = createRef();
  const passwordRef = createRef();

  let navigate = useNavigate();
  let location = useLocation();

  let { signin } = useAuth();

  let from = location.state ? location.state.from.pathname : "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    signin(
      {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      }, 
      () => {
      onSubmitId(authentication.id)
        navigate(from, { replace: true });
      }
    );
   
  };

  return (
    <Form
      className="position-absolute top-50 start-50 translate-middle"
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          ref={usernameRef}
          type="text"
          placeholder="Enter username"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          ref={passwordRef}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <Form.Group className="mb-3" controlId="register">
        <Form.Text className="text-muted">
          Don't have an account yet? <Link to={"/register"}>Sign up here</Link>
        </Form.Text>
      </Form.Group>
    </Form>
  );
}

export default Login;
