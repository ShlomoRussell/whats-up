import React from "react";
import { Form, Button, FormControl } from "react-bootstrap";

function Search() {
  function onSubmitHandler(e) {
    e.preventDefault();
  }
  return (
    <Form onSubmit={onSubmitHandler} className="d-flex position-absolute bottom-25 end-0 w-25 me-3">
      <FormControl
        type="search"
        placeholder="Find Friends"
        className="me-2"
        aria-label="Search"
      />
      <Button variant="outline-success">Search</Button>
    </Form>
  );
}

export default Search;
