import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [name, setName] = useState('');
  useEffect(async () => {
    axios.get('/users')
      .then((resp) => {
        setName(resp.data[0].name);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div style={{ color: 'white', paddingTop: '64px' }}>
      <div>{name} is my name</div>
      <div>Go to movies to see my favorite movies!</div>
    </div>
  );
};

export default Profile;
