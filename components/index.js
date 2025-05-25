import Placeholder from './Placeholder'
import Banner from './Banner'
import TechStack from './TechStack'
import SectionHeader from './common/typography/SectionHeader';
import SectionTextContent from './sections/SectionTextContent';
import SectionProjectCard from './sections/SectionProjectCard';
import SectionSummaryCards from './sections/SectionSummaryCards';
import SectionResourceCards from './sections/SectionResourceCards';
import SectionTechStack from './sections/SectionTechStack';
import SectionFeatureCallout from './sections/SectionFeatureCallout';

import Tags from './common/Tags';
import SingleTag from './common/SingleTag';
import SummaryCard from './common/SummaryCard'
import PrimitiveTextContent from './common/typography/PrimitiveTextContent'
import ButtonGroup from './common/typography/ButtonGroup';
import Button from './common/typography/Button';

const Components = {
  'Banner': Banner,
  'TechStack': TechStack,
  'section-header': SectionHeader,
  'section-text-content': SectionTextContent,
  'section-project-card': SectionProjectCard,
  'section-summary-cards': SectionSummaryCards,
  'section-resource-cards': SectionResourceCards,
  'section-tech-stack': SectionTechStack,
  'section-feature-callout': SectionFeatureCallout,
  'summary-card': SummaryCard,
  'Tags': Tags,
  'SingleTag': SingleTag,
  'primitive-text-content': PrimitiveTextContent,
  'ButtonGroup': ButtonGroup,
  'Button': Button
}

const Component = ({blok, settings}) => {
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component]
    return <Component settings={settings} blok={blok} />
  }
  return <Placeholder componentName={blok.component}/>
}

export default Component