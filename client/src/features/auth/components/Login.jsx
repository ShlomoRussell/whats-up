import React, { createRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useLoginMutation } from "../redux/authApiSlice";
import { setCredentials } from "../redux/authSlice";
import { store } from "../../../app/store";
function Login() {
  const usernameRef = createRef();
  const passwordRef = createRef();
  const { token } = store.getState().auth;

  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState();

  const from = location.state ? location.state.from.pathname : "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      }).unwrap();

      if (res.token) {
        dispatch(setCredentials(res));
        navigate(from, { replace: true });
      }
    } catch (error) {
      if (error.originalStatus === 404) {
        setLoginError(error.data);
      } else {
        setLoginError("Having trouble connecting to server please try again!");
      }
    }
  };
  if (token) {
    return <Navigate to={"/"} replace={true} />;
  }
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      {loginError && <Alert variant={"warning"}>{loginError}</Alert>}
      <Form onSubmit={handleSubmit}>
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
            Don't have an account yet?{" "}
            <Link to={"/register"}>Sign up here</Link>
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Login;
