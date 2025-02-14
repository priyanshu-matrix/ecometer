import React from 'react'
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div >
      <div style={{ textAlign: 'center', padding: '50px', background: '#e0ffcd' , borderRadius: '30px', width: '80%', margin: '0 auto', marginTop: '50px' }}>
        <h1 style={{ color: '#2e7d32', marginBottom: '16px' }}>Go Green, Live Clean</h1>
        <p style={{ color: '#4e4e4e', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Every small step toward a more sustainable lifestyle makes a big difference. 
          Join us in protecting our planet for future generations. 
        </p>
        <p>It may also require 50+sec to load as we are using free hosting.</p>
        <Link to={localStorage.getItem('token') ? '/askai' : '/signup'}>
          <button
            className='btn btn-success my-5'
            style={{ padding: '10px 30px', fontSize: '1.2rem' }}
          >
            Explore
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Landing
