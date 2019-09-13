import * as React from 'react';
// import { Cancelable, throttle } from 'lodash';
import { WrappedComponentProps, injectIntl } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import bemUtils from '../../../utils/bemUtils';
import WithLink from '../../with-link/WithLink';
import './seksjonslenker.less';

const cls = bemUtils('seksjonslenker');

// const getFirstNumberAfter = (n: number, numbers: number[]) => {
//   for (let i = 0; i < numbers.length; i++) {
//     if (n < numbers[i] - SCROLL_OFFSET - 10) {
//       return i - 1;
//     }
//   }

//   return numbers.length - 1;
// };

interface OwnProps {
  sections: string[];
  onSectionChange?: (section: string) => void;
}

type Props = OwnProps & WrappedComponentProps;

interface State {
  currentSection?: number;
  sectionOffsets?: number[];
  documentHeight: number;
  sectionNames: string[];
}

class Seksjonslenker extends React.Component<Props, State> {
  // debouncedOnScroll: (() => void) & Cancelable;

  // constructor(props: Props) {
  //   super(props);

  //   const sectionNames = this.props.sections.map((section) => section);

  //   this.state = {
  //     documentHeight: this.getDocumentHeight(),
  //     sectionNames
  //   };

  //   this.debouncedOnScroll = throttle(this.onScroll, 100);
  // }

  // componentDidMount = () => {
  //   document.addEventListener('scroll', this.debouncedOnScroll);

  //   this.setState({
  //     sectionOffsets: this.getSectionOffsets()
  //   });
  // };

  // componentWillUnmount = () => {
  //   document.removeEventListener('scroll', this.debouncedOnScroll);
  // };

  // getDocumentHeight = () => document.body.scrollHeight;
  // getDocumentScroll = () => window.scrollY || window.pageYOffset;
  // getSectionOffsets = () =>
  //   this.props.sections
  //     .map((section) => document.getElementById(section))
  //     .map((sectionNode) => (sectionNode ? sectionNode.offsetTop : 0));

  // onScroll = () => {
  //   const nextState: any = {};

  //   const currentDocumentHeight = this.getDocumentHeight();
  //   const currentScrollHeight = this.getDocumentScroll();
  //   let currentSectionOffsets = this.state.sectionOffsets;

  //   if (currentDocumentHeight !== this.state.documentHeight) {
  //     currentSectionOffsets = this.getSectionOffsets();
  //     nextState.documentHeight = currentDocumentHeight;
  //     nextState.sectionOffsets = currentSectionOffsets;
  //   }

  //   if (currentSectionOffsets) {
  //     const nextSection = getFirstNumberAfter(currentScrollHeight, currentSectionOffsets);

  //     const didSectionChange = this.state.currentSection !== nextSection;
  //     if (didSectionChange) {
  //       nextState.currentSection = nextSection;

  //       if (this.props.onSectionChange) {
  //         this.props.onSectionChange(this.state.sectionNames[nextSection]);
  //       }
  //     }
  //   }

  //   this.setState(nextState);
  // };

  render = () => {
    const split = Math.round(this.props.sections.length / 2);
    return this.props.sections.map((section, index) => {
      return (
        <Normaltekst className={cls.element('lenke', index < split ? 'right' : 'left')} key={section}>
          <WithLink
            url={`#${section}`}

            // className={this.state.currentSection === index ? cls.element('currentSection') : ''}
          >
            {section}
          </WithLink>
        </Normaltekst>
      );
    });
  };
}

export default injectIntl(Seksjonslenker);
