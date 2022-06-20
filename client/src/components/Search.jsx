import React, { useRef, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Form, Button, FormControl, InputGroup } from "react-bootstrap";

function Search({setSearchHeight}) {
  const searchRef = useRef();
  const searchHeightRef = useRef();
  useEffect(() => {
   setSearchHeight(searchHeightRef.current.offsetHeight);
  }, [])
  
  function onClickHandler(e) {
    e.preventDefault();
    if (searchRef.current.value) {
      console.log(searchRef.current.value);
    }
  }
  return (
    <Form
      ref={searchHeightRef}
      className="d-flex align-items-center flex-shrink-0 p-2 border-bottom"
    >
      <InputGroup>
        <Button
          variant="outline-secondary"
          id="button-addon1"
          className="border-0"
          style={{ pointerEvents: "none", backgroundColor: "#f4f4f4" }}
        >
          <AiOutlineSearch
            style={{ marginTop: "-0.25rem" }}
            onClick={onClickHandler}
          />
        </Button>

        <FormControl
          style={{ backgroundColor: "#f4f4f4" }}
          ref={searchRef}
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          type="search"
          placeholder="Find Friends"
          className="border-0"
        />
      </InputGroup>
    </Form>
  );
}

export default Search;
