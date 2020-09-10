import React from 'react';
import { AnchorLink } from 'gatsby-plugin-anchor-links';
import bemUtils from '../../../../utils/bemUtils';
import Columns from '../../../layout/columns/Columns';
import { SectionMenuItem } from '../PageWithMenu';
import './sectionLinks.less';

interface Props {
    items: SectionMenuItem[];
    activeSectionSlug?: string;
    columns?: 1 | 2;
}

const bem = bemUtils('sectionLinks');

interface SectionLinkProps {
    item: SectionMenuItem;
    isActive: boolean;
}

const SectionLink: React.FunctionComponent<SectionLinkProps> = ({ item, isActive }) => (
    <div key={item.slug} className={bem.classNames(bem.element('item', isActive ? 'active' : undefined))}>
        <AnchorLink className="lenke" to={`#${item.slug}`}>
            {item.label}
        </AnchorLink>
    </div>
);

const SectionLinks: React.FunctionComponent<Props> = ({ items, activeSectionSlug, columns = 1 }) => {
    if (columns === 2) {
        return (
            <div className={bem.block}>
                <Columns
                    items={items}
                    columns={2}
                    itemRenderer={(item: SectionMenuItem) => (
                        <SectionLink key={item.slug} item={item} isActive={activeSectionSlug === item.slug} />
                    )}
                />
            </div>
        );
    }
    return (
        <div className={bem.block}>
            {items.map((item) => (
                <SectionLink key={item.slug} item={item} isActive={activeSectionSlug === item.slug} />
            ))}
        </div>
    );
};

export default SectionLinks;
