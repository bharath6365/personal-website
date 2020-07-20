import { createGlobalStyle } from 'styled-components';
import GlobalTheme from './Global-Theme';
const GlobalStyles =  createGlobalStyle`
  * {
    color: black;
  }

  p {
    line-height: 1.5rem;
  }

  img {
    max-width: 100%;
  }

  span {
    color: inherit;
  }
  .l-page {
    width: 100%;
    max-width: 1140px;
    padding: 0 25px;
    margin-left: auto;
    margin-right: auto;
  }

  .l-page.short {
    max-width: 760px;
  }

  .highlighter-heading {
    padding: 20px;
    background: ${GlobalTheme.primary};
    color: black;
    transform: skewX(0deg);
    transition: letter-spacing 0.3s ease-in-out;
    cursor: pointer;
    font-size: 3.25rem;
    color: black !important;
  }

  .highlighter-heading:hover {
    letter-spacing: 0.35rem;
  }
  
  .background-primary {
    background: ${GlobalTheme.secondary + "B2"};
    padding: 10px;
  }

  h1,h2,h3,h4,h5,h6, p {
    margin: 10px 0;
    color: inherit;
  }

  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 2.25rem;
  }

  pre {
    color: white;
    background: black;
    padding: 20px;
    line-height: 1.5rem;
    font-size: 0.925rem;
  }

  hr {
    border: 1px solid ${GlobalTheme.primary}
  }

  .align-center {
    text-align: center;
  }

  section {
    padding: 50px 0;
  }

  body::-webkit-scrollbar {
    width: 0.875rem;
    background: rgb(48, 48, 48);
  }

  body::-webkit-scrollbar-thumb {
    background: ${GlobalTheme.primary};
    height: 10px;
    border-radius: 30px;
    box-shadow: inset 2px 2px 2px hsla(0,0%,100%,.25), inset -2px -2px 2px rgba(0,0,0,.25);
  }  

`;

export default GlobalStyles;