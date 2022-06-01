import React, { createRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const usernameRef = createRef();
  const passwordRef = createRef();
  const confirmRef = createRef();
  const emailRef = createRef();

  const { signup } = useAuth();
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state ? location.state.from.pathname : "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value === confirmRef.current.value) {
      signup(
        {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
          email: emailRef.current.value,
        },
        () => {
          navigate(from, { replace: true });
        }
      );
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" ref={emailRef} placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          ref={usernameRef}
          type="text"
          placeholder="Choose a username of at least 6 characters"
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
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control ref={confirmRef} type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
}

export default Register;
