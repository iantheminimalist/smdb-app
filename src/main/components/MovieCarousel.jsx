// import React from 'react'
import axios from 'axios'

const getData = () =>{
  axios.get('http://localhost:3000/movies')
  .then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });

}
export const MovieCarousel = () => {
  getData();
  return (
    <div>


    </div>
  )
}

