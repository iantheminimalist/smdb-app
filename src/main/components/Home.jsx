
// import Navbar from '../../navbar/navbar';
import '../assets/home.css';
import { MovieCarousel } from './MovieCarousel';

export default function Home() {
  return (
    <div className='container h-full flex flex-col justify-center items-center place-content-center '>
       <p className='text-6xl font-bold  text-white my-4 py-4'>
        Simple Movie DB
       </p>

       <div className='container text-center text-white'>
            <div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis cumque explicabo, dolorem deleniti iste libero sunt voluptate, sequi fuga, dolor adipisci accusantium voluptatibus earum. Beatae ut quaerat architecto quam blanditiis.
                </p>
            </div>

       </div>
       <div className='container'>
            <div>
              <MovieCarousel />
            </div>

       </div>
        </div>
  )
}
