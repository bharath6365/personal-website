import { createGlobalStyle } from 'styled-components';
import GlobalTheme from './Global-Theme';
import GlobalConstants from './Global-Constants';
const GlobalStyles = createGlobalStyle`
  * {
    color: black;
  }

  body {
    margin: 0;
    font-family: 'Rubik', sans-serif;
  }

  a {
    color: ${GlobalTheme.secondary};
    word-break: break-word;
  }

  h1, h2, h3, h4,h5, h6, .highlighter-heading {
    font-family: 'Josefin Sans', sans-serif;
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
    display: block;
    margin: auto;
    padding: 20px 0;
    transition: letter-spacing 0.3s ease-in-out;
    font-size: 4.5rem;
    color: ${props => props.theme.primary};

    &.white {
      color: white;
    }

    @media ${GlobalConstants.mobileMediaQuery} {
      padding: 10px 0;
      text-align: center;
    }
  }

  
  .background-primary {
    background: ${GlobalTheme.primary};
    padding: 10px;
    display: inline-block;
    transform: skewX(-12deg);
    font-family: 'Rubik', sans-serif;
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

  a {
    text-decoration: none;
  }

  pre {
    color: white;
    background: black;
    padding: 20px;
    line-height: 1.625rem;
    font-family: inherit;
    font-size: 1rem;
    overflow: hidden;
    letter-spacing: 0.3px;
    line-height: 1.75rem;
    font-family: 'Josefin Sans';
    margin-top: 1rem;
    transition: transform 0.45 ease-in;
    border-radius: 20px;
    animation: rotate 5s infinite ease-in-out;
    animation-delay: 3s;
    box-shadow: 
    0px 0px 10px rgba(255,0,0,0.5), /* Red gradient */
    0px 0px 20px rgba(0,255,0,0.3);
  }

  pre:hover {
    animation-play-state: paused;
  }

  @keyframes rotate {
    0% { transform: rotate3d(0, 0, 1, 0deg); }
    40% { transform: rotate3d(0, 0, 1, 0.75deg); }
    50% { transform: rotate3d(0, 0, 1, 1.5deg); } 
    80% { transform: rotate3d(0, 0, 1, 0.75deg); }
    100% { transform: rotate3d(0, 0, 1, 0deg); } 
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
