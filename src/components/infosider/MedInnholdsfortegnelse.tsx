import * as React from 'react';
import classnames from 'classnames';
import MediaQuery from 'react-responsive';

import bemUtils from '../../utils/bemUtils';
import Innholdsfortegnelse from './innholdsfortegnelse/Innholdsfortegnelse';
import Mobilmeny from './mobilmeny/Mobilmeny';

import './infosider.less';

const cls = bemUtils('infosider');

interface MedInnholdsfortegnelseProps {
  sections: string[];
  button?: {
    label: string;
    url: string;
  };
  children: React.ReactNode;
}

const MedInnholdsfortegnelse = ({ sections, button, children }: MedInnholdsfortegnelseProps) => (
  <div className={classnames(cls.element('container'), cls.modifier('medInnholdsfortegnelse'))}>
    <MediaQuery minWidth={1072}>
      <aside className={cls.element('sidebar')}>
        <Innholdsfortegnelse
          sections={sections}
          button={
            button
              ? {
                  label: button.label,
                  url: button.url
                }
              : undefined
          }
        />
      </aside>
    </MediaQuery>
    <MediaQuery maxWidth={1071}>
      <Mobilmeny
        sections={sections}
        button={
          button
            ? {
                label: button.label,
                url: button.url
              }
            : undefined
        }
      />
    </MediaQuery>
    {children}
    <div className={cls.element('filler')} />
  </div>
);

export default MedInnholdsfortegnelse;
