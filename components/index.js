
import Placeholder from './Placeholder'
import Banner from './Banner'
import SectionHeader from './common/typography/SectionHeader';
import SectionTextContent from './sections/SectionTextContent';
import SectionProjectCard from './sections/SectionProjectCard';
import SectionSummaryCards from './sections/SectionSummaryCards';
import Tags from './common/Tags';
import SingleTag from './common/SingleTag';
import SummaryCard from './common/SummaryCard'
import PrimitiveTextContent from './common/typography/PrimitiveTextContent'

const Components = {
  'Banner': Banner,
  'section-header': SectionHeader,
  'section-text-content': SectionTextContent,
  'section-project-card': SectionProjectCard,
  'section-summary-cards': SectionSummaryCards,
  'summary-card': SummaryCard,
  'Tags': Tags,
  'SingleTag': SingleTag,
  'primitive-text-content': PrimitiveTextContent
}

const Component = ({blok}) => {
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component]
    return <Component blok={blok} />
  }
  return <Placeholder componentName={blok.component}/>
}

export default Component