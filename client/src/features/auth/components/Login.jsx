import React, { createRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/authApiSlice";
import { selectCurrentToken, setCredentials } from "../redux/authSlice";

function Login() {
  const usernameRef = createRef();
  const passwordRef = createRef();
  const token = useSelector(selectCurrentToken);

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
      });
      if (res.data.token) {
        dispatch(setCredentials(res.data));
        navigate(from, { replace: true });
      }
    } catch (error) {
      if (!error.originalStatus) {
        setLoginError("Having trouble connecting to server please try again!");
      } else {
        setLoginError(error.data);
      }
    }
  };
  if (token) return navigate("/");
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
