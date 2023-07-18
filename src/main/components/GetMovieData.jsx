// import React from 'react'
import axios from 'axios'

export const GetMovieData = () =>{
  axios.get('http://localhost:3000/movies')
  .then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });

  return(
    <>
    hi
    </>
  )
}

