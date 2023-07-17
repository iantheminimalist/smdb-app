

import {  useReducer, useEffect } from 'react'
import axios from 'axios';
import {INITIAL_STATE, fetchMovies } from './getReducers';
import * as ActionTypes from './ActionTypes';
import { baseURL } from '../shared/baseURL';


export const MovieCarousel = () => {
  const [state, dispatch] = useReducer(fetchMovies, INITIAL_STATE)

  const handleFetch = () =>{
      //fetch all jobs
      dispatch({type: ActionTypes.MOVIE_FETCH_LOADING })
      axios.get(baseURL + "/movies")
      .then((res) => {
          return res.data; 
      })
      .then((data) => {
          console.log(data)
          dispatch({ type: ActionTypes.MOVIE_FETCH_SUCCESS, payload: data})
      })
      .catch((err) => {  
          dispatch({ type: ActionTypes.MOVIE_FETCH_FAILED})
          console.log(err)
      })
  }

useEffect(() => {
 handleFetch()
 

}, [])



  return (
    
    <div>

{state.movies.map((movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
        </div>
      ))}
    </div>
  )
}

