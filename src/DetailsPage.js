import React from "react";
import { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import Header from "./component/Header";
import "./DetailsPage.css";
import Card from "./component/card";
import bookmark1 from "./assets/bookmark 1.svg";
import bookmark from "./assets/bookmark.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { settings } from "./config";

function DetailsPage() {
  const location = useLocation();
  const history = useNavigate();
  const showData = location.state.data;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [searchResults, setResults] = useState([]);
  const [BookmarkArray, setBookmarkArray] = useState([]);

  const toggleBookmark = () => {
    if (isBookmarked) {
      let newItems = BookmarkArray.filter( ele => ele.id !== showData.id);
      localStorage.setItem("myList", JSON.stringify([...newItems]));
      setIsBookmarked(!isBookmarked);
      console.log(isBookmarked);
    } else {
      BookmarkArray!==null ? localStorage.setItem("myList", JSON.stringify([showData,...BookmarkArray])) 
      :
      localStorage.setItem("myList", JSON.stringify([showData]));
      setIsBookmarked(!isBookmarked);
      console.log(isBookmarked);
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("myList"))
    if(data){
      data.map( e => e.id==showData.id && setIsBookmarked(!isBookmarked));
      setBookmarkArray([...data])
    }
    else{
      console.log('no data found in localstorage');
    }
    console.log(isBookmarked);
  }, []);

  return (
    <div>
      <Header searchResults={searchResults} setResults={setResults} />
      <div className="container">
        {!searchResults?.length ? (
          <div className="row py-4">
            <div className="col-12 col-lg-4">
              <img className="image" src={showData.image.original} />
            </div>
            <div className="col-12 col-lg-8">
              <div className="d-flex justify-content-between">
                <div className="title">
                  <h1 className="name">{showData.name}</h1>
                  <Rating
                    size={16}
                    initialValue={showData.rating.average / 2}
                    disableFillHover={true}
                  />
                </div>
                <span onClick={toggleBookmark}>
                  {isBookmarked ? (
                    <button type="button" class="btn btn-primary rounded-pill">
                      <img style={{ height: "20px" }} src={bookmark1} />
                      <span
                    style={{
                      color: "white",
                      paddingRight: "8px",
                      paddingLeft: "10px",
                      fontWeight: "700",
                      cursor: "pointer"
                    }}
                  >
                     Bookmarked
                  </span>
                    </button>
                    
                  ) : (
                    <button type="button" class="btn btn-outline-primary rounded-pill">
                    <img style={{ height: "20px" }} src={bookmark} />
                    <span
                    style={{
                      color: "white",
                      paddingRight: "8px",
                      paddingLeft: "10px",
                      fontWeight: "400",
                      cursor: "pointer"
                    }}
                  >
                    Add Bookmark
                  </span>
                    </button>
                  )}
                  
                </span>
              </div>
              <div className="detail">
                <span>Premiered On: {showData.premiered}</span>|
                <span>Runtime: {showData.runtime}</span>|
                <span>Language: {showData.language}</span>
              </div>
              <p
                className="para"
                dangerouslySetInnerHTML={{ __html: showData.summary }}
              ></p>
            </div>
          </div>
        ) : (
          <div className="row py-4">
            <div className="col-12 col-lg-4">
              <img className="image" src={showData.image.original} />
            </div>
            <div className="col-12 col-lg-8">
              <div className="d-flex justify-content-between">
                <div className="title">
                  <h1 className="name">{showData.name}</h1>
                  <Rating
                    size={16}
                    initialValue={showData.rating.average / 2}
                    disableFillHover={true}
                  />
                </div>
                <span onClick={toggleBookmark}>
                  {isBookmarked ? (
                    <img style={{ height: "40px" }} src={bookmark1} />
                  ) : (
                    <img style={{ height: "40px" }} src={bookmark} />
                  )}
                  <span
                    onClick={() => history("/BookMarkList")}
                    style={{
                      color: "white",
                      paddingLeft: "10px",
                      fontWeight: "700",
                    }}
                  >
                    View All Bookmarks
                  </span>
                </span>
              </div>
              <div className="detail">
                <span>Premiered On: {showData.premiered}</span>|
                <span>Runtime: {showData.runtime}</span>|
                <span>Language: {showData.language}</span>
              </div>
              <p
                className="para"
                dangerouslySetInnerHTML={{ __html: showData.summary }}
              ></p>
              <div>
                <h1 className="heading">Search Results...</h1>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    paddingRight: ".5rem",
                    gap: ".5rem",
                  }}
                >
                  {searchResults.map((data) =>
                    data?.show ? (
                      <Card
                        showData={data.show}
                        imageURL={data.show.image?.medium}
                        key={data.show.id}
                      />
                    ) : null
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default DetailsPage;
