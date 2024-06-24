import React, { useState } from 'react';
import './Styles.css';

const SignIn = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    // Example user data
    const user = { username, token: 'fake-jwt-token' };
    localStorage.setItem('user', JSON.stringify(user));
    onSignIn(user);
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={handleSignIn}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="sign-in-button">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
