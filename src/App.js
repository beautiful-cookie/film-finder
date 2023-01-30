import React, { useState, useEffect } from 'react'; 
import './App.css';  
import Header from './components/Header/Header';
import Movie from './components/Movie/Movie'; 
import Search from './components/Search/Search';


function App() { 

  const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"; 

  const [loader, setLoader] = useState(false); 
  const [moviesArr, setMoviesArr] = useState([]); 
  const [errMessage, setErrMessage] = useState(null); 

  useEffect ( () => {
    fetch(MOVIE_API_URL) 
      .then(response => response.json()) 
      .then(searchJSON => {
        setMoviesArr(searchJSON.Search)  
        console.log(searchJSON.Search)
        setLoader(false) 
      }) 
  }, [])  

  const search = searchValue => {
    setLoader(true) 
    setErrMessage(null) 

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`) 
      .then(response => response.json())  
      .then(responseJSON => {
        if (responseJSON.Responce === 'True') {
          setMoviesArr(responseJSON.Search)  
          setLoader(false) 
        } 
        else {
          setErrMessage(responseJSON.Error) 
          setLoader(false) 
        }
      }) 
  }
  
  return (
    <div className='app-wrapper'>
      <Header /> 
      <Search search={search} /> 
      <div className='movieWrapper'> 
        { loader && !errMessage ? (<span>loading...</span>) 
        : errMessage 
        ? (<div className='errMessage'>{errMessage}</div>) 
        : moviesArr.map((movie, index) => (
          <Movie key={`${index}-${movie.Title}`} movie={movie} />  
        ))} 
      </div> 
    </div> 
  );
}

export default App;
