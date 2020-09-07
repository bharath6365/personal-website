import { createGlobalStyle } from 'styled-components';
import GlobalTheme from './Global-Theme';
import GlobalConstants from './Global-Constants';
const GlobalStyles = createGlobalStyle`
  * {
    color: black;
    font-family: 'Rubik', sans-serif;
  }

  body {
    margin: 0;
  }

  a {
    color: ${GlobalTheme.secondary};
  }

  h1, h2, h3, h4,h5, h6 {
    font-family: 'Roboto Condensed', sans-serif;
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
    display: inline-block;
    text-align: center;
    margin: auto;
    padding: 20px;
    font-family: 'Roboto Condensed', sans-serif;
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
    background: ${GlobalTheme.primary};
    padding: 10px;
    display: inline-block;
    transform: skewX(-12deg)
  }

  .compressed-margin {
    margin: 0;
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

  .small-card:hover~.small-card {
    transform: translateX(130px);
  }


  section {
    padding: 50px 0;

    header {
      max-width: 50vw;
      margin: auto;
    }
  }

  section.dark {

/* Lawrencium-Covered */
background: #0f0c29;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #24243e, #302b63, #0f0c29); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
   
}

  *::-webkit-scrollbar {
    width: 0.75rem;
    background: rgb(48, 48, 48);
  }

  *::-webkit-scrollbar-thumb {
    background: ${GlobalTheme.primary};
    height: 10px;
    border-radius: 30px;
    box-shadow: inset 2px 2px 2px hsla(0,0%,100%,.25), inset -2px -2px 2px rgba(0,0,0,.25);
  }  

  /* Make clicks pass-through */
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: ${(props) => props.theme.primary};
  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
}

/* Fancy blur effect */
#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px ${(props) => props.theme.primary}, 0 0 5px ${(props) => props.theme.primary};
  opacity: 1.0;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
#nprogress .spinner {
  display: block;
  position: fixed;
  z-index: 1031;
  top: 15px;
  right: 15px;
}

#nprogress .spinner-icon {
  width: 18px;
  height: 18px;
  box-sizing: border-box;

  border: solid 2px transparent;
  border-top-color: ${(props) => props.theme.primary};
  border-left-color: ${(props) => props.theme.primary};
  border-radius: 50%;

  -webkit-animation: nprogress-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}

@-webkit-keyframes nprogress-spinner {
  0%   { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes nprogress-spinner {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}



/* Tablet Styles */
@media ${GlobalConstants.tabletMediaQuery} {
  .highlighter-heading {
    font-size: 2.25rem;
  }

  .l-page {
    max-width: 90%;
  }
}

/* Mobile Styles */
@media ${GlobalConstants.mobileMediaQuery} {

  * {
    box-sizing: border-box;
  }

  .l-page {
    max-width: 100%;
    margin: 0;
    padding: 0 15px;
  }
  section {
    header {
      max-width: 95vw;
    }
  }

  .small-card:hover~.small-card {
    transform: translateX(0);
  }
}



`;

export default GlobalStyles;
