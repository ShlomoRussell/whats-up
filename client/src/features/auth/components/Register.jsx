import React, { createRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { store } from "../../../app/store";
import { useRegisterMutation } from "../redux/authApiSlice";

function Register() {
  const usernameRef = createRef();
  const passwordRef = createRef();
  const confirmRef = createRef();
  const emailRef = createRef();
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const { token } = store.getState().auth;
  const [registerError, setRegisterError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        confirmPassword: confirmRef.current.value,
        email: emailRef.current.value,
      }).unwrap();
      if (res) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      if (error.originalStatus === 400 || error.originalStatus === 409) {
        setRegisterError(error.data);
      } else {
        setRegisterError(
          "Having trouble connecting to server please try again!"
        );
      }
    }
  };
  if (token) {
    return <Navigate to={"/"} replace={true} />;
  }
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      {registerError && (
        <Alert variant={"warning"} style={{ textTransform: "capitalize" }}>
          {registerError}
        </Alert>
      )}
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
