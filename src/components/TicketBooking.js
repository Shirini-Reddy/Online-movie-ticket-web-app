import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ShowTimings from './ShowTimings';
import './bookyshow.css';

const TicketBooking = () => {
  const { title } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

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

  const { title: movieTitle, genre, date, showTimings } = movieDetails;
  const selectedTimings = showTimings.find((item) => item.date === selectedDate)?.timings || [];

  // Function to format date to "16\nJan" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    return `${day}\n${month}`;
  };

  // Function to handle date selection
  const handleDateSelect = (selectedDate) => {
    console.log('Selected Date:', selectedDate);
    setSelectedDate(selectedDate);
  };

  return (
        <div style={{ marginTop: '70px', marginLeft: '50px', fontFamily: 'sans-serif' }}>
        <div className='data-moviename-container'>
        <h1>{movieTitle}</h1>
      <li>{genre}</li>
      <hr style={{ color: 'black', borderTop: '0.3px solid black' }} />

      <div className="date-time-container">
        <div className="date-container">
          {date.map((date, index) => (
            <h4 key={index} onClick={() => handleDateSelect(date)}>
              <center>{formatDate(date)}</center>
            </h4>
          ))}
        </div>
      </div>

        </div>
     
      {selectedDate && (
       <>
       
       {showTimings.map((dateData, index) => (
  <ShowTimings
    key={index}
    selectedDate={selectedDate}
    showTimings={dateData}
  />
))}
     </>
      )}
    </div>
    
  );
};

export default TicketBooking;
