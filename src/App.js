import React, { useState, useEffect, useReducer } from 'react'; 
import './App.css';  
import Header from './components/Header/Header';
import Movie from './components/Movie/Movie'; 
import Search from './components/Search/Search';


const initialState = {
  loading: true, 
  errorMessage: null, 
  moviesArr: [] 
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state, 
        loader: true, 
        errMessage: null 
      }      
      case 'SEARCH_MOVIES_SUCCESS':
        return { 
          ...state, 
          loader: false, 
          moviesArr: action.insideJSON 
        }   
        case 'SEARCH_MOVIES_FAILURE':
          return {
            ...state, 
            loader: false, 
            errMessage: action.error  
          }   
  
    default:
      return state;
  }
}

function App() { 
  const [state, dispatch] = useReducer(reducer, initialState) 

  const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"; 


  useEffect ( () => {
    fetch(MOVIE_API_URL) 
      .then(response => response.json()) 
      .then(searchJSON => { 

        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS', 
          insideJSON: searchJSON.Search, 
        }) 
        
      }) 
  }, [])  

  const search = searchValue => { 

    dispatch({
      type: 'SEARCH_MOVIES_REQUEST', 
    })

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`) 
      .then(response => response.json())  
      .then(responseJSON => {
        if (responseJSON.Response === 'True') { 
          dispatch({ 
            type: 'SEARCH_MOVIES_SUCCESS', 
            insideJSON: responseJSON.Search, 
          }) 
        } 
        else { 
          dispatch({
            type: 'SEARCH_MOVIES_FAILURE', 
            error: responseJSON.Error 
          }) 
        }
      }) 
  }
  
const {errMessage, loader, moviesArr} = state; 

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
