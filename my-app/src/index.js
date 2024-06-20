import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// Use ReactDOM.createRoot to create a root with concurrent mode enabled
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
