import React from 'react';
import Stopwatch from '../components/Stopwatch';

const Home = () => {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Stopwatch</h1>
        <p>Track your time with precision</p>
      </div>
      <Stopwatch />
    </div>
  );
};

export default Home;
