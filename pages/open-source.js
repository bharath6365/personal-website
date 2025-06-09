import React from 'react'
import Head from 'next/head'
import Page from '../components/Page'
import Layout from '../components/layout'
import StoryblokService from '../utils/storyblok-service'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageContent: props.page && props.page.data && props.page.data.story 
        ? props.page.data.story.content 
        : { body: [] },
    }
  }

  static async getInitialProps({ query }) {
    StoryblokService.setQuery(query)

    try {
      let [page, settings] = await Promise.all([
        StoryblokService.get('cdn/stories/open-source'),
        StoryblokService.get('cdn/stories/settings')
      ])

      return {
        page,
        settings
      }
    } catch (error) {
      console.error('Error fetching Storyblok data:', error)
      return {
        page: null,
        settings: null
      }
    }
  }

  componentDidMount() {
    if (this.props.page) {
      StoryblokService.initEditor(this)
    }
  }

  render() {
    const settingsContent = this.props.settings && this.props.settings.data 
      ? this.props.settings.data.story 
      : { content: { main_footer: [{}] } }
    const bodyOfPage = this.state.pageContent.body || []

    return (
      <Layout settings={settingsContent}>
        <Head>
          <title>Open Source - Bharath Kumar</title>
        </Head>
        {/* We will define these settings later on */}
        <Page settings={settingsContent} body={bodyOfPage} />
      </Layout>
    )
  }
}