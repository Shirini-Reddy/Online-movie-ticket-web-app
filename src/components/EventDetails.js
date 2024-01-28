import React,{useState,useEffect} from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import NavBar from './navBar';
import './bookyshow.css';

const EventDetails=()=>{
    const { title } = useParams();
    const [eventDetails, setEventDetails] = useState(null);
  
    useEffect(() => {
      const fetchEventDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/events?title=${title}`);
          setEventDetails(response.data[0]); // Assuming the API returns an array with a single movie object
        } catch (error) {
          console.error('Error fetching event details:', error);
        }
      };
  
      fetchEventDetails();
    }, [title]);
  
    if (!eventDetails) {
      return <div>Loading...</div>;
    }
    const { title: eventTitle, date, image,time,category,subject,duration,description} = eventDetails;
    return(
        <>
        <NavBar/>
        <div className='event-details-page' style={{backgroundColor:'#f0f0f0'}}>
            <div>
             <img src={image} className='event-details-image' style={{ display: 'block', margin: 'auto' }} />
            </div>
            <div className='event-details-info' style={{width:'100%',height:'200px',backgroundColor:'white',border: '1px solid white'}}>
               
                <h3 style={{color:'black',margin: '0' }}><b>{eventTitle}</b></h3>
                <p style={{fontSize:'20px',marginTop:'20px'}}>{category}|{subject}|{duration}</p>
                <hr style={{border:'2px solid #f0f0f0'}}/>
                <p style={{fontSize:'20px'}}>{date}</p>
            </div>
            <div style={{width:'100%',height:'200px',marginTop:'20px', backgroundColor:'white',border: '1px solid white'}}>
               
               <h3 style={{color:'black',margin: '0' }}><b>About</b></h3>
               <p style={{fontSize:'20px',marginTop:'20px'}}>{description}</p>
           </div>

        </div>
        </>
        
    )
}
export default EventDetails;