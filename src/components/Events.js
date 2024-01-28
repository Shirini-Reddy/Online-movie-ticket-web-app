import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Events=()=>{
    const [events, setEvents] = useState([]);

    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await axios.get('http://localhost:8000/events');
          setEvents(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchEvents();
    }, []);

    return(
        <>
        <div>
        <h1 style={{marginLeft:'50px'}}>Events</h1>
        </div>
        <div className='events'>
         <div className='event-container' style={{flexWrap:'wrap',justifyContent:'centre',width:'1500px'}}>
            {events.map((event,idx)=>(
                <div key={event.id} className='event-item'>
                 <div className='event-image-container'>
                    <Link to={`/event/${encodeURIComponent(event.title)}`}>
                    <img src={event.eventimage} key={idx} className='event-image' alt={event.title}/>
                    </Link>
                  
                 </div>
                </div>
            ))}
         </div>
        </div>
        </>
       
    )
}
export default Events;