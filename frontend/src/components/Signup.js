import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const test=(e)=>
  // {
  //   console.log("value is changed",e.target.value);
  //   setUsername(e.target.value)
  // }
  const handleSignup = async (e) => {
    e.preventDefault();//prevent the reloading
    setError('');//reset the error

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try 
    {
      const res = await axios.post('http://localhost:5001/signup', {
        username,
        password, 
      });
      /* {"username":"value","password":"value"} */
      
      alert('Signup successful! Please sign in.');
      navigate('/signin'); // Redirect to signin page
    } 
    catch (err) {
      console.error('Signup Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Signup;
