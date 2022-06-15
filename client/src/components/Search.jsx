import React, { useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Form, Button, FormControl, InputGroup } from "react-bootstrap";

function Search() {
  const searchRef = useRef();
  function onClickHandler(e) {
    e.preventDefault();
    if (searchRef.current.value) {
      console.log(searchRef.current.value);
    }
  }
  return (
    <Form className="d-flex align-items-center flex-shrink-0 p-3  text-decoration-none border-bottom">
      <InputGroup>
        <Button variant="outline-secondary" id="button-addon1">
          <AiOutlineSearch onClick={onClickHandler} />
        </Button>

        <FormControl
          ref={searchRef}
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          type="search"
          placeholder="Find Friends"
          className="me-2"
        />
      </InputGroup>
    </Form>
  );
}

export default Search;
