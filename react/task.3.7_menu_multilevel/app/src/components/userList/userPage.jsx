import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import { BiUser, BiNavigation, BiEnvelope, BiWindowAlt, BiPhone } from 'react-icons/bi';
import './userPage.css';

const UserPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${userId}`
          );
          const userData = response.data;
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
  
      fetchUser();
    }, [userId]);
  
    if (!user) {
      return <div>Loading user data...</div>;
    }

    return (
      <div>
        <h2>User Details</h2>
        <div className="user-page">
          <div className='user'>
            <div className='user-details'>
              <BiUser className='icon'/>
              <div className="user-deatils-row">
                <p>{user.name}</p>
                <span>Name</span>
              </div>
            </div>
            <div className="user-details">
              <BiNavigation className='icon'/>
              <div className="user-deatils-row">
                <p>{user.address.street} street, <br/>
                    {user.address.suite} suite, <br/>
                    {user.address.city} city, <br/>
                    {user.address.zipcode} zipcode</p>
                <span>Adress</span>
              </div>
            </div>
            <div className="user-details">
              <BiEnvelope className='icon'/>
              <div className="user-deatils-row">
                <p>{user.email}</p>
                <span>Email</span>
              </div>
            </div>
            <div className="user-details">
              <BiWindowAlt className='icon'/>
              <div className="user-deatils-row">
                <p>{user.website}</p>
                <span>Website</span>
              </div>
            </div>
            <div className="user-details">
              <BiPhone className='icon'/>
              <div className="user-deatils-row">
                <p>{user.phone}</p>
                <span>Phone</span>
              </div>  
            </div>   
          </div>
        </div>
      </div>
    );
  };
  
export default UserPage;