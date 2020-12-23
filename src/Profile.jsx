import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [name, setName] = useState('');
  useEffect(async () => {
    axios.get('/users')
      .then((resp) => {
        console.log(resp.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div style={{ color: 'white' }}>
      <div>{name} this is my name</div>

    </div>
  );
};

export default Profile;
