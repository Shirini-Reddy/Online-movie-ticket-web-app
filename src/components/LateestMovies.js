import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './bookyshow.css';

const LatestMovies=()=>{
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      const fetchMovies = async () => {
        try {
          const response = await axios.get('http://localhost:8000/movies');
          setMovies(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchMovies();
    }, []);
    return(
        <>
        <div>
        <h1 style={{marginLeft:'50px'}}>Latest Movies</h1>
        </div>
        <div className='latest-movies'>
            <div className=' movie-container' style={{flexWrap:'wrap',justifyContent:'centre',width:'1500px'}}>
                {movies.map((movie, idx) => (
                <div key={movie.id} className={`movie-item`}>
                     <div className='image-container'>
                     <Link to={`/movie/${encodeURIComponent(movie.title)}`}>
                        <img src={movie.image} key={idx} className='movie-image' alt={movie.title} />
                        </Link>
                     </div>
                     <div className='text-container'>
                         <h3>{movie.title}</h3>
                         <p style={{ fontSize: '20px' }}>{movie.genre}</p>
                     </div>
                </div>
                ))}
            </div>
        </div>
        </>
       
    )
}
export default LatestMovies;