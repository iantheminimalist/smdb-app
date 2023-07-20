

import {  useReducer, useEffect } from 'react'
// import axios from 'axios';
import {INITIAL_STATE, fetchMovies } from './getReducers';
import * as ActionTypes from './ActionTypes';
// import { baseURL } from '../shared/baseURL';



export const MovieCarousel = () => {
  const [state, dispatch] = useReducer(fetchMovies, INITIAL_STATE)

  const handleFetch = () =>{
      //fetch all jobs
      dispatch({type: ActionTypes.MOVIE_FETCH_LOADING })
      // axios.get(baseURL + "/movies")
      fetch('movies.json')
      .then((res) => {
          return res.json(); 
      })
      .then((res) => {
          console.log(res)
          dispatch({ type: ActionTypes.MOVIE_FETCH_SUCCESS, payload: res.movies})
      })
      .catch((err) => {  
          dispatch({ type: ActionTypes.MOVIE_FETCH_FAILED})
          console.log(err)
      })
  }

useEffect(() => {
 handleFetch()
 

}, [])

// console.log(state.movies)
// let randomMovies = Math.floor(Math.random() * state.movies.length)
// console.log(randomMovies);
  return (
    
    <div>

      {state.movies.filter((_movie, idx) => idx < 5).map((movie) => (
        <div key={movie.id}>
          <h2 className='text-white'>{movie.title}</h2>
        </div>
      ))}

      
    </div>
  )
}

