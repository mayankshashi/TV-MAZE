import React from "react";
import './card.css';
import { useNavigate } from "react-router-dom";

function Card(props) {
    const {
        showData,
        imageURL,
      } = props;

    const history = useNavigate();  
    return(
        //explain
        <div className="card" onClick={()=>history('/DetailsPage',{ state: { data : showData} })}>  
            <img className="season-poster" src={imageURL}/>
        </div>
    );
}

export default Card;