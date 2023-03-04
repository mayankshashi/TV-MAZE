import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import DetailsPage from "./DetailsPage";
import BookMarkList from "./BookMarkList";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<MainPage />} />
        <Route exact path="/DetailsPage" element={<DetailsPage />} />
        <Route exact path="/BookMarkList" element={<BookMarkList />} />
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;