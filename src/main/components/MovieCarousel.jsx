

import {  useReducer, useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion';
import {INITIAL_STATE, fetchMovies } from './getReducers';
import * as ActionTypes from './ActionTypes';

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
      while (moviesArr.length < 7) {
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

// const [width, setWidth] = useState(0)
const carousel = useRef();


// useEffect(() => {
//   console.log(carousel.current);
// },[]);

  return (
    <div>
    <motion.div ref={carousel} className='overflow-hidden'>
      <motion.div 
      drag='x'
      dragConstraints={{right: 0}}
      className=' '
      >
    <div className='relative flex   flex-row   '>

    {movieDetails.map((movie) => (
      <motion.div key={movie.imdbID} className='m-3'>
      <div key={movie.imdbID} className='relative  w-full'>
        <button id={movie.imdbID} className='relative  w-60 h-80'>
        <div className='absolute w-60 h-80 backdrop-blur-none bg-white/0 transition ease-in hover:backdrop-blur-sm hover:bg-black/30 duration-150'></div>
          <img src={movie.Poster} className="w-60 h-80" />
        </button>
      </div>
      </motion.div>

    ))}
    </div>
    </motion.div>
    </motion.div>
    </div>


  )
}

