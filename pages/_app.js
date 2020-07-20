import React from 'react';
import App, { Container } from 'next/app';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '../styles/Global-Styles';
import GlobalTheme from '../styles/Global-Theme';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps
    };
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={GlobalTheme}>
        <Container>
          <Component {...pageProps} />
          <GlobalStyles />
        </Container>
      </ThemeProvider>
    );
  }
}

export default MyApp;
