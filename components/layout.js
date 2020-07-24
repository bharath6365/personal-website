// Common layout for all the pages. Insert all your global styles here.
import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'
import StoryblokService from '../utils/storyblok-service'
import Footer from './footer'

export default ({ children, settings = {} }) => (
  <div>
    <Head />
    <Nav settings={settings} />
    <div className="util__container">
      {children}
    </div>

    <Footer settings={settings} />

    {/* Load the Story Blok Bridge. */}
    {StoryblokService.bridge()}
  </div>
)