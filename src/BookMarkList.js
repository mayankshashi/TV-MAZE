import React from "react";
import { useState, useEffect } from "react";
import Header from "./component/Header";
import "./DetailsPage.css";
import { useNavigate } from "react-router-dom";
import bookmark from "./assets/Vector.svg";
import Card from "./component/card";
import "./BookMarkList.css";

function BookMarkList() {
  const history = useNavigate();
  const [myList,setMyList] = useState([]);

 useEffect(()=>{
  setMyList(JSON.parse(localStorage.getItem("myList")));
  
 },[]) 
 console.log(myList);

  return (
    <>
    
      <header>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid d-flex">
          <a className="navbar-brand" onClick={() => history("/")}>
            MAZE TV
          </a>
          <div>
          <img style={{ height: "20px" }} src={bookmark} />
          <span className="bookmark">
            My Bookmarks
          </span>
          </div>
        </div>
      </nav>
    </header>
        
        <div className="cardcontainer">
          {!myList.length ? (
            <div style={{ color: "#fff" }}>You have no Bookmark yet.</div>
          ) : 
          (
            myList.map((elem) => (
              <div style={{ display: "flex",  }}>
                <Card
                showData ={elem}
                imageURL ={elem.image.medium} />
              </div>
            ))
          )}
        </div>
        </>
  );
}
export default BookMarkList;
