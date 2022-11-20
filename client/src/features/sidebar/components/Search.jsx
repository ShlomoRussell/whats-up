import React, { useRef, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";
import { Form, Button, FormControl, InputGroup } from "react-bootstrap";
import styles from "../styles/search.module.css";

function Search({ setSearchHeight, isFocused, setSearchIsFocused }) {
  const searchRef = useRef();
  const searchHeightRef = useRef();
  useEffect(() => {
    setSearchHeight(searchHeightRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    if (isFocused) {
      searchRef.current.focus();
    }
  }, [isFocused]);
  function onSearch(e) {
    e.preventDefault();
    if (searchRef.current.value) {
      console.log(searchRef.current.value);
    }
  }
  return (
    <Form
      onSubmit={onSearch}
      ref={searchHeightRef}
      className="d-flex align-items-center flex-shrink-0 p-2 border-bottom"
    >
      <InputGroup>
        <Button
          variant="outline-secondary"
          id="button-addon1"
          className={`${styles["search-btn"]} border-0 `}
        >
          {isFocused ? (
            <FiArrowLeft className={styles["icon"]} />
          ) : (
            <AiOutlineSearch className={styles["icon"]} />
          )}
        </Button>

        <FormControl
          onBlur={() => setSearchIsFocused(false)}
          onFocus={() => setSearchIsFocused(true)}
          ref={searchRef}
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          type="search"
          placeholder="Find Friends"
          className={`${styles["input"]} border-0`}
        />
      </InputGroup>
    </Form>
  );
}

export default Search;
