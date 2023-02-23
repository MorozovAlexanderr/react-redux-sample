import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
  
  * {
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
  }
  
  #root {
    height: 100%;
    width: 100%;
    display: flex;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p, 
  ul {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyles;
