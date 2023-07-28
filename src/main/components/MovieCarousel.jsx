

import {  useReducer, useEffect, useState } from 'react'
// import axios from 'axios';
import {INITIAL_STATE, fetchMovies } from './getReducers';
import * as ActionTypes from './ActionTypes';
// import { baseURL } from '../shared/baseURL';
// import {movieURL} from '../shared/baseURL';
const movieURL = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_APP_MOVIE_API_KEY}&t=`

export const MovieCarousel = () => {
  const [state, dispatch] = useReducer(fetchMovies, INITIAL_STATE)
  const [randomMovies, setRandomMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);


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
// grabs all top 100 movies and randomizes them.
useEffect(() => {
  if (state.movies.length > 0) {
    const getRandomMovies = () => {
      let moviesArr = [];
      while (moviesArr.length < 5) {
        let randomIndex = Math.floor(Math.random() * state.movies.length);
        if (!moviesArr.includes(randomIndex)) {

          moviesArr.push(randomIndex);
        }
      }
      return moviesArr.map((index) => state.movies[index]);
    };

    setRandomMovies(getRandomMovies());
  }
}, [state.movies]);

// fetch retech request to get all random movies metadata from OMDB API
useEffect(() => {
  if (randomMovies.length > 0) {
    const fetchMovieDetails = async () => {
      const promises = randomMovies.map((movie) => fetch(`${movieURL}${movie.title}`).then((res) => res.json()));
      const movieDetails = await Promise.all(promises);
      setMovieDetails(movieDetails);
    };

    fetchMovieDetails();
  }
}, [randomMovies]);

  return (
    
    <div className='container flex justify-evenly items-center content-center flex-row flex-wrap my-9 py-9'>
      {movieDetails.map((movie) => (
        <div key={movie.imdbID} className='relative transition ease-in  hover:scale-110 duration-150 '>
          <button id={movie.imdbID}>
          <div className='absolute w-full h-80 backdrop-blur-none bg-white/0 transition ease-in hover:backdrop-blur-sm hover:bg-black/30 duration-150'></div>
            <img src={movie.Poster} className="w-full h-80 object-cover" />
          </button>
        </div>
      ))}
    </div>
  )
}

