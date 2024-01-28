import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ShowTimings = ({ selectedDate, showTimings }) => {
  const [selectedTiming, setSelectedTiming] = useState(null);
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedCinemaHallName, setSelectedCinemaHallName] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate=useNavigate();

  const selectedDateData = showTimings.find((item) => item.date === selectedDate);
  useEffect(() => {
    if (selectedDateData) {
      const categories = Array.from(
        new Set(
          selectedDateData.cinemaHalls.flatMap((cinema) =>
            cinema.timings.flatMap((timing) => timing.category.map((cat) => cat.catname))
          )
        )
      );
      setAvailableCategories(categories);
    }
  }, [selectedDateData]);

  const handleTimingClick = (timing) => {
    setSelectedTiming(timing);
    setSelectedCategory(null);
    setIsModalOpen(true);
    setSelectedCinemaHallName(timing.name);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
  };
  
  const calculateTicketCost = () => {
    console.log('selectedTiming:', selectedTiming.category);
  console.log('selectedCategory:', selectedCategory);
    const selectedCategoryData = selectedTiming.category.find((cat) => cat.catname === selectedCategory);
    console.log('selectedCategoryData:', selectedCategoryData);
    if (selectedCategoryData) {
      return `$${numberOfSeats*(selectedCategoryData.ticketPrice)}`;
    } else {
      return '0';
    }
  };

  const handleNumberOfSeatsChange = (event) => {
    setNumberOfSeats(parseInt(event.target.value, 10));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
const placeBooking=()=>{
  if (!numberOfSeats || !selectedCategory) {
    // Show an alert or notification if required fields are not selected
    alert("Please select seats and category before booking.");
    return;
}
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  return `${day}\n${month}`;
};
const selectedCategoryData = selectedTiming.category.find((cat) => cat.catname === selectedCategory);

  const bookingData = {
    Time: selectedTiming.time, // Assuming your API expects the timing ID
    NumberOfSeats: numberOfSeats,
    Category: selectedCategory,
    ScreenNumber:selectedTiming.screenNumber,
    TicketPrice:selectedCategoryData.ticketPrice,
    Date:formatDate(selectedDateData.date),
    CinemaHall:selectedCinemaHallName
  
    // Add other relevant data based on your API requirements
  };
  {console.log(selectedCategory.ticketPrice)}
  console.log("Booking confirmed")
  fetch('http://localhost:6002/bookings',{
    method: 'POST',
    headers:{
        'accept':'application/json',
        'Content-Type':'application/json'
    },
    body: JSON.stringify(bookingData),
})
.then( navigate('/booking-details',  {state: {bookingData }} ))
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
        })
.catch(error => {
console.error('Error:', error);
})
}
  const { cinemaHalls } = selectedDateData;

  return (
    <div className="show-timings-container">
      {cinemaHalls.map((cinema, index) => (
        <div key={index} className="cinema-timings-row">
          <p style={{ marginRight: '200px' }}>{cinema.name}</p>
          <div className="timings-container">
            {cinema.timings.map((timing, timingIndex) => (
              <button
                key={timingIndex}
                style={{ color: 'green', marginRight: '10px' }}
                onClick={() => handleTimingClick({ ...cinema, ...timing })}
              >
                {timing.time}
              </button>
            ))}
          </div>
        </div>
      ))}

      {isModalOpen && selectedTiming && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>Selected Timing: {selectedTiming.time}</h3>

            <label>
              Number of Seats:
              <input
                type="number"
                min="1"
                value={numberOfSeats}
                onChange={handleNumberOfSeatsChange}
              />
            </label>
            <div>
              <label>
                Select Category:
                <select value={selectedCategory || ''} onChange={handleCategoryChange}>
                  <option value="" disabled hidden>
                    Select
                  </option>
                  {availableCategories.map((category, index) => (
                    <option key={index} value={category} style={{ color: 'white' }}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <p>Screen Number: {selectedTiming.screenNumber}</p>
            <p>Category: {selectedCategory}</p>
            <p>Ticket Cost: {calculateTicketCost()}</p>
            <button style={{color:'red'}} onClick={placeBooking}>Book Now</button>
          </div>
         
        </div>
      )}
    </div>
  );
};

export default ShowTimings;
