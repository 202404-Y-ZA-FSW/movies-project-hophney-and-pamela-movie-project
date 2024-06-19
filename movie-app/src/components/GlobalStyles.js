import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
    background-color: #121212;
    color: #fff;
    padding-bottom: 50px; /* Adjust this value as needed */
  }

  a {
    color: inherit;
    text-decoration: none;
    margin: 0 10px;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #333;
  }

  nav h1 {
    margin: 0;
  }

  nav div {
    display: flex;
    gap: 20px;
  }

  nav form {
    display: flex;
    gap: 10px;
  }

  footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 10px 0;
    position: fixed;
    width: 100%;
    bottom: 0;
  }

  footer p {
    margin: 5px 0;
  }
`;

export default GlobalStyles