import Component from './index'
import SbEditable from 'storyblok-react'
import SectionTechStack from './sections/SectionTechStack'

const Page = ({body, settings}) => {
  return (
  <SbEditable content={body}>
  <main>
    {body && body.map((blok) =>
      <Component settings={settings} blok={blok} key={blok._uid} />
    )}
    <SectionTechStack blok={{}} />
  </main>
  </SbEditable>
)}

export default Page