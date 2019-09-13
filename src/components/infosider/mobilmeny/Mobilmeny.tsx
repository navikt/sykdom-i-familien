import React, { useRef, RefObject, useState, FunctionComponent } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';
import classnames from 'classnames';
import './mobilmeny.less';
import BEMHelper from '../../../utils/bemUtils';
import MobilMenyHeader from './MobilMenyHeader';
import Seksjonslenker from '../seksjonslenker/Seksjonslenker';
import useComponentAwareClick from '../../../hooks/useComponentAwareClick';
import WithLink from '../../with-link/WithLink';

import { WrappedComponentProps, injectIntl } from 'react-intl';

const cls = BEMHelper('mobilmeny');

interface OwnProps {
  sections: string[];
  button?: {
    label: string;
    url: string;
  };
}

type Props = OwnProps & WrappedComponentProps;

const Mobilmeny: FunctionComponent<Props> = ({ sections, button, intl }: Props) => {
  const menuRef: RefObject<HTMLDivElement> = useRef(null);
  const [isOpen, toggleMenu] = useState<boolean>(false);
  const [currentSection, setSection] = useState<string | undefined>(undefined);

  const onMenuClick = (clickedOnMenu: boolean, clickedOnLinkOrHeader: boolean) => {
    if (isOpen) {
      if (!clickedOnMenu || clickedOnLinkOrHeader) {
        toggleMenu(false);
      }
    } else if (clickedOnMenu) {
      toggleMenu(true);
    }
  };

  const onSectionChange = (section: string) => {
    setSection(section);
    if (!section) {
      toggleMenu(false);
    }
  };

  const shouldCloseMenuWhenClicked = ['lenke', 'mobilmeny__header'];
  useComponentAwareClick(menuRef, onMenuClick, shouldCloseMenuWhenClicked);

  return (
    <nav
      ref={menuRef}
      className={classnames(classnames(cls.block), {
        // [cls.element('hidden')]: !currentSection
      })}>
      <Panel>
        <MobilMenyHeader header={currentSection || 'Header'} isOpen={isOpen} />
        <div className={cls.element('expandable', isOpen ? 'expanded' : undefined)}>
          <div className={cls.element('lenker')}>
            <Seksjonslenker sections={sections} onSectionChange={onSectionChange} />
          </div>
          {button && (
            <WithLink className={cls.element('søkNå')} urlIsExternal={true} url={button.url} noStyling={true}>
              <Hovedknapp>{button.label}</Hovedknapp>
            </WithLink>
          )}
        </div>
      </Panel>
    </nav>
  );
};

export default injectIntl(Mobilmeny);
