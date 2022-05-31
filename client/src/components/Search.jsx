import React from "react";
import { Form, Button, FormControl } from "react-bootstrap";

function Search() {
  function onSubmitHandler(e) {
    e.preventDefault();
  }
  return (
    <nav class="navbar bg-light">
      <div class="container-fluid">
        <a class="navbar-brand">What's Up</a>
        <Form onSubmit={onSubmitHandler} className="d-flex align-self-end w-25">
          <FormControl
            type="search"
            placeholder="Find Friends"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </div>
    </nav>
  );
}

export default Search;
