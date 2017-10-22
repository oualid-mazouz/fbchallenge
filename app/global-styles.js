import { injectGlobal } from 'styled-components';
import boldFont from './fonts/Brandon Grotesque Bold.otf';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  @font-face {
    font-family: 'Brandon Grotesque Bold';
    src: url(${boldFont}) format('truetype');
    font-weight: normal;
    font-style: normal;
  },
  html,
  body {
    height: 100%;
    width: 100%;
    
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    overflow: -webkit-paged-y !important;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;
