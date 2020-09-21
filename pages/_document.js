import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import StoryblokService from '../utils/storyblok-service'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <script dangerouslySetInnerHTML={{__html: `var StoryblokCacheVersion = '${StoryblokService.getCacheVersion()}';` }}></script>

          <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;700&display=swap" rel="stylesheet" />

          <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />



        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}