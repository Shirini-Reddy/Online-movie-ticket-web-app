import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './bookyshow.css';
import NavBar from './navBar';

const MovieDetails = () => {
  const { title } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/movies?title=${title}`);
        setMovieDetails(response.data[0]); // Assuming the API returns an array with a single movie object
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [title]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const { title: movieTitle, genre, image, languages, plot,director } = movieDetails;

  return (
    <>
    <NavBar/>
     <div className='movie-details-page'>
      <div className='movie-details-container'>
        <img src={image} alt={movieTitle} className='movie-details-image' />
        <div className='movie-details-info'>
          <h1 style={{color:'black'}}>{movieTitle}</h1>
          <div className='ratings-details-box'>
            <div>
              <h4 style={{color:'white'}}><b>Add your rating & review</b></h4>
              <p style={{color:'white'}}>Your ratings matter</p>
            </div>
            <button>Rate now</button>
          </div>
          <div className='language-details-box'>
            <h4 style={{color:'black'}}>{languages}</h4>
          </div>
          <h4 style={{color:'white'}}><li>{genre}</li></h4>
          <Link to={`/book-tickets/${title}`} className='book-tickets-button'>Book Tickets</Link>
        </div>
      </div>
      <div className='about-movie-section'>
        <h1>About the movie</h1>
        <p>{plot}</p>
      </div>
      <div>
        <h1>Crew:</h1>
        <h2>Director:</h2>
        <p style={{fontSize:'20px'}}>{director}</p>
      </div>
    </div>
    </>
    
   
  );
};

export default MovieDetails;
