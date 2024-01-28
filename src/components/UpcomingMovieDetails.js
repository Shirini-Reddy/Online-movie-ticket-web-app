import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './bookyshow.css';
import NavBar from './navBar';

const UpcomingMovieDetails=()=>{
    const { title } = useParams();
    const [upcomingMovieDetails, setUpcomingMovieDetails] = useState(null);
  
    useEffect(() => {
      const fetchMovieDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/upcomingmovies?title=${title}`);
          setUpcomingMovieDetails(response.data[0]); // Assuming the API returns an array with a single movie object
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      };
  
      fetchMovieDetails();
    }, [title]);
  
    if (!upcomingMovieDetails) {
      return <div>Loading...</div>;
    }
  
    const { title: movieTitle, genre, image, languages, plot,director ,releasedate} = upcomingMovieDetails;
  
    return(
        <>
         <NavBar/>
    <div className='movie-details-page'>
      <div className='movie-details-container'>
        <img src={image} alt={movieTitle} className='movie-details-image' />
        <div className='movie-details-info'>
          <h1 style={{color:'white'}}>{movieTitle}</h1>
          <div className='ratings-details-box'>
            <div>
              <h4 style={{color:'white'}}><b>Releasing on {releasedate}</b></h4>
            </div>
          </div>
          <div className='language-details-box'>
            <h4 style={{color:'black',marginBottom:'40px'}}>{languages}</h4>
          </div>
          <h4 style={{color:'white'}}><li>{genre}</li></h4>
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
      
    )
}
export default UpcomingMovieDetails;