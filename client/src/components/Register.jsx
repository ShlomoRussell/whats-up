import React, { createRef } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register({ onSubmitId, onSubmitToken }) {
  const usernameRef = createRef();
  const passwordRef = createRef();
  const confirmRef = createRef();
  const emailRef = createRef();

  const { signup, authError } = useAuth();
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state ? location.state.from.pathname : "/";

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(
      {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        confirmPassword: confirmRef.current.value,
        email: emailRef.current.value,
      },
      onSubmitId,
      onSubmitToken,
      () => {
        navigate(from, { replace: true });
      }
    );
  };
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      {authError && <Alert variant={"warning"} style={{textTransform:"capitalize"}}>{authError}</Alert>}
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
            placeholder="'John Doe'"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordRef}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            ref={confirmRef}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default Register;
