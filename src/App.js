import React, { useEffect, useReducer } from 'react'; 
import './App.css';  
import Header from './components/Header/Header';
import Movie from './components/Movie/Movie'; 
import Search from './components/Search/Search';


const setPagesCount = (pages) => {
  let tempArr = []
  let totalPagesCount = Math.ceil(pages / 10) 
  for (let i = 1; i<=totalPagesCount; i++) {
    tempArr.push(i)
  } 
  return tempArr 
}

const initialState = {
  loading: true, 
  errorMessage: null, 
  moviesArr: [], 
  pages: setPagesCount(0), 
  page: 1, 
  search: 'man' 
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state, 
        loader: true, 
        errMessage: null, 
        page: action.newPage, 
        search: action.newValue 
      }      
      case 'SEARCH_MOVIES_SUCCESS': 
        return { 
          ...state, 
          loader: false, 
          pages: setPagesCount(action.pagesCount), 
          moviesArr: action.insideJSON 
        }   
        case 'SEARCH_MOVIES_FAILURE':
          return {
            ...state, 
            loader: false, 
            errMessage: action.error  
          }   
        case 'UPDATE_PAGE':
          return {
            ...state, 
            page: action.newPage 
          }   
   
    default:
      return state;
  }
}

function App() { 
  const [state, dispatch] = useReducer(reducer, initialState) 

  const MOVIE_API_URL = `https://www.omdbapi.com/?s=${state.search}&apikey=4a3b711b&plot=full&page=${state.page}`; 


  useEffect ( () => {
    fetch(MOVIE_API_URL) 
      .then(response => response.json()) 
      .then(searchJSON => { 
        if (searchJSON.Response === 'True') { 
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS', 
            insideJSON: searchJSON.Search, 
            pagesCount: searchJSON.totalResults 
          }) 
        }
        else { 
          dispatch({
            type: 'SEARCH_MOVIES_FAILURE', 
            error: searchJSON.Error 
          }) 
        }
        
      }) 
  }, [state.page, state.search])  

  const search = searchValue => { 
    
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST', 
      newPage: 1, 
      newValue: searchValue 
    }) 
}
  
const {errMessage, loader, moviesArr, pages, page} = state; 

  return (
    <div className='app-wrapper'>
      <Header returnToMainpage={search} /> 
      <Search search={search} /> 
      <div className='movieWrapper'> 
        { loader && !errMessage ? (<span className='loading'>Loading...</span>) 
        : errMessage 
        ? (<div className='errMessage'>{errMessage}</div>) 
        : moviesArr.map((movie, index) => (
          <Movie key={`${index}-${movie.Title}`} movie={movie} />  
        ))} 
      </div> 
      <div className='pagination-wrapper'>
          <div className='paginator'>
            {
              pages.map(p => {
                return (
                  <span className={page === p ? 'page selectedPage' : 'page'} key={p}
                    onClick={ (e) => {
                      dispatch({
                        type: 'UPDATE_PAGE', 
                        newPage: p 
                      })
                    }}>
                    <span>{p}</span>
                  </span>
                )
              })
            }
          </div>
      </div>
    </div> 
  );
}

export default App; 
