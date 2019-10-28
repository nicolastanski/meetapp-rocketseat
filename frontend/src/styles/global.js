import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background: linear-gradient(-180deg, #22202C, #402845) no-repeat;
    background-size: cover;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #fff;
    font-size: 14px;
    font-family: Helvetica, Arial, sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

`;
