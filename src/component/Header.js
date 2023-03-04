import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import axios from "axios";
import bookmark from "../assets/Vector.svg";

function Header(props) {
  const { searchResults, setResults } = props;
  const [searchValue, setSearchValue] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    let debounce = setTimeout(() => {
      try {
        axios
          .get(`https://api.tvmaze.com/search/shows?q=${searchValue}`)
          .then((res) => setResults(res.data));
      } catch (e) {
        console.log(e);
      }
    }, 1000);
    return () => clearTimeout(debounce);
  }, [searchValue]);

  return (
    <header>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid d-flex">
          <a className="navbar-brand" onClick={() => history("/")}>
            MAZE TV
          </a>

          <div className="searchbox">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Shows here..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
          </div>
          <div>
          <img style={{ height: "20px" }} src={bookmark} />
          <span onClick={() => history("/BookMarkList")} className="bookmark">
            My Bookmarks
          </span>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
