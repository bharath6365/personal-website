import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module 

import GlobalStyles from '../styles/Global-Styles';
import GlobalTheme from '../styles/Global-Theme';

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

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
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        </Head>
        <Container>
          <Component {...pageProps} />
          <GlobalStyles />
        </Container>
      </ThemeProvider>
    );
  }
}

export default MyApp;
