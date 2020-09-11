import React from 'react'
import Head from 'next/head'
import Page from '../components/Page'
import Layout from '../components/layout'
import StoryblokService from '../utils/storyblok-service'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageContent: props.page.data.story.content,
    }
  }

  static async getInitialProps({ query }) {
    StoryblokService.setQuery(query)

    let [page, settings] = await Promise.all([
      StoryblokService.get('cdn/stories/home'),
      StoryblokService.get('cdn/stories/settings')
    ])

    return {
      page,
      settings
    }
  }

  componentDidMount() {
    StoryblokService.initEditor(this)
  }

  render() {
    const settingsContent = this.props.settings.data.story
    const bodyOfPage = this.state.pageContent.body

    return (
      <Layout settings={settingsContent}>
        <Head>
          <title>Bharath: Full Stack Developer</title>
        </Head>
        {/* We will define these settings later on */}
        <Page settings={settingsContent} body={bodyOfPage} />
      </Layout>
    )
  }
}