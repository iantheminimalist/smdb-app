

import {  useReducer, useEffect, useState, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion';
import {INITIAL_STATE, fetchMovies } from './getReducers';
import * as ActionTypes from './ActionTypes';

const movieURL = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_APP_MOVIE_API_KEY}&t=`

export const MovieCarousel = () => {
  const [state, dispatch] = useReducer(fetchMovies, INITIAL_STATE) //state management
  const [randomMovies, setRandomMovies] = useState([]); //set random movies
  const [movieDetails, setMovieDetails] = useState([]); //
  const [width, setWidth] = useState(0) //set width for the movie carousel
  const carousel = useRef(); //access the carousel reference
  const innerCarousel = useRef(); //access the inner-carousel reference


  const handleFetch = () =>{
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
 handleFetch() //grab all the movies from JSON and DB
}, [])
// grabs all top 100 movies and randomizes them.
useEffect(() => {
  if (state.movies.length > 0) {
    const getRandomMovies = () => {
      let moviesArr = [];
      while (moviesArr.length < 7) {// grabbing only 7 movies
        let randomIndex = Math.floor(Math.random() * state.movies.length); // random number beteen 1-100
        if (!moviesArr.includes(randomIndex)) {

          moviesArr.push(randomIndex); //save a random movies data
        }
      }
      return moviesArr.map((index) => state.movies[index]); //grab movie info
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


//carousel effect



const controls = useAnimation();
// Set the initial position of the shape (off-screen to the left)
const initialPosition = { x: -1530};
// Define the animation options

// Function to move the shape on load
useEffect(() => {
  let carouselWidth = carousel.current.scrollWidth;
  const animationOptions = {
    x: (carouselWidth * 2), // Move to the right
    transition: { duration: 100, origin: 1  } // Animation duration in seconds
  };

  setWidth(carouselWidth);
  controls.start(animationOptions);
}, [controls]);


  return (
    <div>
      <motion.div ref={carousel} className='overflow-hidden' id='carouselMain'>
        <motion.div 
        animate={controls} style={{ x: initialPosition.x }}
        drag='x'
        dragConstraints={{right: 0 , left: -width}}
        whileTap={{cursor:"grabbing"}}
        className=' '
        ref={innerCarousel}
        id='innerCarousel'>
          <div className='relative flex flex-row ' id='carouselContainer'>

          {movieDetails.map( (movie) => (
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

