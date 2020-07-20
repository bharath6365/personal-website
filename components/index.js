import Teaser from './Teaser'
import Feature from './Feature'
import Grid from './Grid'
import Placeholder from './Placeholder'
import Slide from './Slide'
import Banner from './Banner'
import SectionHeader from './common/typography/SectionHeader';
import SectionTextContent from './sections/SectionTextContent';
import SectionProjectCard from './sections/SectionProjectCard';

const Components = {
  'teaser': Teaser,
  'feature': Feature,
  'grid': Grid,
  'slide': Slide,
  'Banner': Banner,
  'section-header': SectionHeader,
  'section-text-content': SectionTextContent,
  'section-project-card': SectionProjectCard
}

const Component = ({blok}) => {
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component]
    return <Component blok={blok} />
  }
  return <Placeholder componentName={blok.component}/>
}

export default Component