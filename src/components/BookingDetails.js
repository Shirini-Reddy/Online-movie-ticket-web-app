import React from "react";
import { useLocation } from 'react-router-dom';
import './bookyshow.css';

const BookingDetails = () => {
    // Use useLocation to get the state passed during navigation
    const location = useLocation();
    const bookingData = location.state?.bookingData || {};
  
    // Render booking details
    return (
      <div className="booking-details">
        <h2>Booking Details</h2>
        <hr style={{border:'0.1px solid black'}}/>
        <p>Time: {bookingData.Time}</p>
        <p>Number of Seats: {bookingData.NumberOfSeats}</p>
        <p>Category: {bookingData.Category}</p>
        <p>Screen Number: {bookingData.ScreenNumber}</p>
        <p>Ticket Price: {bookingData.NumberOfSeats*bookingData.TicketPrice}</p>
        <p>Date: {bookingData.Date}</p>
        {/* Add more details as needed */}
      </div>
    );
  };
  export default BookingDetails;