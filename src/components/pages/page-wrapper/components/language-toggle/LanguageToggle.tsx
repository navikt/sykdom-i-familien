import * as React from 'react';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';
import { NedChevron } from 'nav-frontend-chevron';
import NorwayFlagSVG from './NorwayFlagSVG';
import { FormattedMessage } from 'gatsby-plugin-intl';
import 'nav-frontend-lenker-style';
import './languageToggle.less';
import { Locale } from '../../../../../i18n/locale';

interface Props {
    toggle: (locale: Locale) => void;
    locale: Locale;
}

const AvailableLocales: Locale[] = ['nb', 'nn'];

const renderMenuItem = (locale: Locale) => {
    return (
        <li key={locale}>
            <MenuItem className="languageToggle__menu__item">
                <div className="languageToggle__button__flag">
                    <NorwayFlagSVG />
                </div>
                <div className="languageToggle__button__language" data-locale={locale}>
                    <FormattedMessage id={`locale.${locale}`} />
                </div>
            </MenuItem>
        </li>
    );
};

const LanguageToggle: React.StatelessComponent<Props> = ({ locale, toggle: toggleLanguage }) => {
    const menuLanguages: Locale[] = [...AvailableLocales].filter((code) => code !== locale) as Locale[];

    return (
        <div className="languageToggle">
            <Wrapper
                className="languageToggle__wrapper"
                onSelection={(element: JSX.Element[]) => toggleLanguage(element[1].props['data-locale'])}>
                <Button className="languageToggle__button">
                    <div className="languageToggle__button__flag">
                        <NorwayFlagSVG />
                    </div>
                    <div className="languageToggle__button__language">
                        <FormattedMessage id={`locale.${locale}`} />
                    </div>
                    <div>
                        <NedChevron />
                    </div>
                </Button>
                <Menu className="languageToggle__menu">
                    <ul>{menuLanguages.map((code) => renderMenuItem(code))}</ul>
                </Menu>
            </Wrapper>
        </div>
    );
};
export default LanguageToggle;
