import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const NavBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/movies');
        const allMovies = response.data;

        const filteredSuggestions = allMovies.filter(movie =>
          movie.title.toLowerCase().includes(searchInput.toLowerCase())
        );

        setSuggestions(filteredSuggestions);
      } catch (error) {
        console.error('Error fetching movie suggestions:', error);
        // Handle the error, e.g., set an error state or display a message to the user
      }
    };

    if (searchInput.trim() !== '') {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchInput]);

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion.title);
    setSuggestions([]); // Clear suggestions
    navigate(`/movie/${encodeURIComponent(suggestion.title)}`);
  };

  const handleSearchButtonClick = () => {
    if (searchInput.trim() !== '') {
      navigate(`/movie/${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <div className='header'>
      <h3 style={{ fontStyle: 'italic', marginBottom: '25px', color: 'white' }}>bookmyshow</h3>
      <input
        type='text'
        placeholder='Search for Movies, Events'
        style={{ width: '70%', height: '30px', marginLeft: '20px', color: 'black' }}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <div className='suggestions-container'>
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className={`suggestion`}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion.title}
          </div>
        ))}
      </div>
      <button
        style={{ width: '10%', height: '25px', marginLeft: '20px', color: 'black' }}
        onClick={handleSearchButtonClick}
      >
        Search
      </button>
    </div>
  );
};

export default NavBar;
