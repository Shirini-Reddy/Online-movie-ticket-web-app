import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './bookyshow.css';
const UpcomingMovies=()=>{
    const [upcomingmovies, setUpComingMovies] = useState([]);

    useEffect(() => {
      const fetchMovies = async () => {
        try {
          const response = await axios.get('http://localhost:8000/upcomingmovies');
          setUpComingMovies(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchMovies();
    }, []);
return(
    <>
    <div>
        <h1 style={{marginLeft:'30px'}}>Upcoming Movies</h1>
    </div>
    <div className='upcoming-movies'>
    <div className=' movie-container' style={{flexWrap:'wrap',justifyContent:'centre',width:'1500px'}}>
                {upcomingmovies.map((movie, idx) => (
                <div key={movie.id} className={`movie-item`}>
                     <div className='image-container'>
                     <Link to={`/Upcomingmovie/${encodeURIComponent(movie.title)}`}>
                        <img src={movie.image} key={idx} className='movie-image' alt={movie.title} />
                        </Link>
                     </div>
                     <div style={{border:'0.02px solid white'}}></div>
                     <div style={{width:'220px',height:'35px',backgroundColor:'black',marginTop:'0px'}}>
                        
                     <span style={{ color: 'white', fontSize: '24px' }}>{movie.releasedate}</span>
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
export default UpcomingMovies;