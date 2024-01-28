import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './bookyshow.css';
import { Link } from 'react-router-dom';
import NavBar from './navBar';

const RecommendedMovies = () => {
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

  return (
    <div className='app'>
      <NavBar/>
      <div className='menu-options'>
        <Link to='/Latest-movies'>Latest Movies</Link>
        <Link to='/Upcoming-movies'>Upcoming Movies</Link>
        <Link to='/Events'>Events</Link>
      </div>
      <div style={{display:'flex', justifyContent:'space-between'}}>
      <h2 style={{ marginTop: '5%'}}>
        <b>Recommended Movies</b>
      </h2>
      <Link to='/all-movies' style={{ color: 'orange', cursor: 'pointer',marginTop:'65px' }}>
        See All
      </Link>
      </div>
     
      <div className=' movie-container'>
        {movies.slice(0, 10).map((movie, idx) => (
          <div key={movie.id} className={`movie-item`}>
            <Link to={`/movie/${encodeURIComponent(movie.title)}`}>
            <img src={movie.image} key={idx} className='movie-image' alt={movie.title}/>
            </Link>
            <h3>{movie.title}</h3>
            <p style={{ fontSize: '20px' }}>{movie.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedMovies;
