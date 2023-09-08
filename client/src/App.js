import * as React from "react";
import { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import Search from "./components/form/search";

function App() {
  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((result) => result.json())
      .then((data) => setMovieData(data))
      .catch(err => console.log(err))
  }, []);
  return (
    <div className="Movie App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {movieData.map((movie) => (
          <p>{movie.title}</p>
        ))}
        <Search setData={setMovieData}/>
      </header>
    </div>
  );
}

export default App;
