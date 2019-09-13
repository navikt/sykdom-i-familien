import React, { useRef } from 'react';
import BEMHelper from '../../../utils/bemUtils';
import classnames from 'classnames';
import Lenkeknapp from '../../lenkeknapp/Lenkeknapp';
import Seksjonslenker from '../seksjonslenker/Seksjonslenker';
import SvgMask from '../../svg-mask/SvgMask';
// import useComponentSize from '../../../hooks/useComponentSize';
import './innholdsfortegnelse.less';

const cls = BEMHelper('innholdsfortegnelse');
const icon = require('../../../assets/icons/rakett.svg').default;

interface Props {
  sections: string[];
  button?: {
    label: string;
    url: string;
  };
}

const Innholdsfortegnelse: React.StatelessComponent<Props> = ({ sections, button }) => {
  const ref = useRef(null);
  // const { height } = useComponentSize(ref);

  return (
    <div
      ref={ref}
      className={classnames('panel', cls.block)}
      // style={{
      //   top: `calc(50% - ${height / 2}px)`
      // }}
    >
      <div className={cls.element('icon')}>
        <SvgMask small={true} svg={icon} />
      </div>
      <Seksjonslenker sections={sections} />
      {button && (
        <Lenkeknapp type="hoved" url={button.url} urlIsExternal={true}>
          {button.label}
        </Lenkeknapp>
      )}
    </div>
  );
};

export default Innholdsfortegnelse;
