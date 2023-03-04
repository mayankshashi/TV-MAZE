import React from "react";
import { useState, useEffect } from "react";
import { settings } from "./config";
import axios from "axios";
import Card from "./component/card";
import Header from "./component/Header";
import "./MainPage.css";
import Slider from "react-slick";

function MainPage() {
  const [show, setShow] = useState([]);
  const [searchResults, setResults] = useState([]);

  const data = async () => {
    try {
      const res = await axios.get("https://api.tvmaze.com/shows");
      setShow(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    data();
  }, []); 

  console.log(show);

  const DramaShows = show.filter((vid) => vid.genres.includes("Drama"));
  const HorrorShows = show.filter((vid) => vid.genres.includes("Horror"));
  const RomanceShows = show.filter((vid) => vid.genres.includes("Romance"));

  return (
    <div>
      <Header searchResults={searchResults} setResults={setResults}/>
      <div className="main-container">
        {
          !searchResults?.length ?
            (<div>
              <div className="category">
                <h1 className="heading">Drama</h1>
                <Slider {...settings} style={{ height: "300px" }}>
                  {DramaShows.map((data) => (
                    <Card
                      showData= {data}
                      imageURL={data.image.medium}
                      key={data.id}
                    />
                  ))}
                </Slider>
              </div>

              <div className="category">
                <h1 className="heading">Horror</h1>
                <Slider {...settings} style={{ height: "300px" }}>
                  {HorrorShows.map((data) => (
                    <Card
                      showData= {data}
                      imageURL={data.image.medium}
                      key={data.id}
                    />
                  ))}
                </Slider>
              </div>

              <div className="category">
                <h1 className="heading">Romance</h1>
                <Slider {...settings} style={{ height: "300px" }}>
                  {RomanceShows.map((data) => (
                    <Card
                      showData= {data}
                      imageURL={data.image.medium}
                      key={data.id}
                    />
                  ))}
                </Slider>
              </div>
            </div>)
            :

            (<div>
              <div className="category">
                <h1 className="heading">Search Results...</h1>
                <div style={{ display: "flex", flexWrap: "wrap", paddingRight: ".5rem", gap: ".5rem" }}>
                  {searchResults.map((data) => (
                    data?.show ? <Card
                      showData= {data.show}
                      imageURL={data.show.image?.medium}
                      key={data.show.id}
                    /> : null
                  ))}
                </div>
              </div>
            </div>)}
      </div>
    </div>
  );
}

export default MainPage;