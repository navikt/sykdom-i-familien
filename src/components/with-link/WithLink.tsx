import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Lenke from 'nav-frontend-lenker';
import classnames from 'classnames';
import bemUtils from '../../utils/bemUtils';
import CustomSVGFromSprite from '../../utils/CustomSVG';

import './withLink.less';

const externalLinkIcon = require('../../assets/icons/external.svg').default;

const cls = bemUtils('withLink');

interface Props {
  url: string;
  urlIsExternal?: boolean;
  addExternalIcon?: boolean;
  noStyling?: boolean;
  noTabbing?: boolean;
  className?: string;
  style?: any;
  bypassNavlab?: boolean;
  ariaLabel?: string;
  children: ReactNode;
}

export const SCROLL_OFFSET = 90;

export class WithLink extends React.Component<Props> {
  goToSection = (url: string) => (event: any) => {
    event.preventDefault();
    window.history.replaceState(null, '', url);

    // Exception for IE and Edge which doesn't support window.scroll with options.
    if (navigator.userAgent.includes('Trident') || navigator.userAgent.includes('Edge')) {
      const target = document.querySelector(url);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      const id = url.slice(1);
      const sectionNode = document.getElementById(id);
      if (sectionNode) {
        window.scroll({
          top: sectionNode.offsetTop - SCROLL_OFFSET,
          behavior: 'smooth'
        });
      }
    }
  };

  render = () => {
    const {
      urlIsExternal,
      url,
      addExternalIcon,
      noStyling,
      noTabbing,
      className,
      style,
      ariaLabel,
      children
    } = this.props;
    const classNames = classnames(cls.block, className, {
      [cls.element('noStyling')]: noStyling
    });

    if (urlIsExternal) {
      if (noStyling) {
        return (
          <a tabIndex={noTabbing ? -1 : 0} target="_blank" rel="noopener noreferrer" className={className} href={url}>
            {children}
          </a>
        );
      } else {
        return (
          <Lenke target="_blank" rel="noopener noreferrer" className={classNames} href={url}>
            {children}
            {addExternalIcon && (
              <span className={cls.element('icon')}>
                <CustomSVGFromSprite size={15} iconRef={externalLinkIcon} />
              </span>
            )}
          </Lenke>
        );
      }
    } else if (url.charAt(0) === '#') {
      if (noStyling) {
        return (
          <span
            role="link"
            aria-label={ariaLabel}
            className={className + ' anchorLink'}
            style={style}
            onClick={this.goToSection(url)}>
            {children}
          </span>
        );
      } else {
        return (
          <Lenke className={className + ' anchorLink'} style={style} onClick={this.goToSection(url)} href={url}>
            {children}
          </Lenke>
        );
      }
    } else {
      return (
        <Link style={style} tabIndex={noTabbing ? -1 : 0} className={noStyling ? className : classNames} to={url}>
          {children}
        </Link>
      );
    }
  };
}

export default WithLink;
