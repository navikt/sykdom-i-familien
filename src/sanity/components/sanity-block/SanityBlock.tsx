import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import Lenke from 'nav-frontend-lenker';
import { BlockContentType } from '../../types/parts';

import './sanityBlock.less';

interface Props {
    content: BlockContentType;
}

const ListItemRenderer = (props: { children: React.ReactNode; node: { style: string } }) => {
    return <li className={props.node.style}>{props.children}</li>;
};

const BlockRenderer = (props: { children: React.ReactNode; node: { style: string } }) => {
    if (props.node.style === 'button') {
        return <div className="sanityLinkButtonWrapper">{props.children}</div>;
    }
    return <p>{props.children}</p>;
};
const LinkRenderer = (props: {
    children: React.ReactNode;
    mark: {
        linkNumber: number;
        href: string;
    };
}) => {
    return (
        <Lenke href={props.mark.href} data-link-number={props.mark.linkNumber}>
            {props.children}
        </Lenke>
    );
};

const SanityBlock: React.FunctionComponent<Props> = ({ content }) => {
    return (
        <BlockContent
            blocks={content}
            serializers={{
                listItem: ListItemRenderer,
                marks: {
                    link: LinkRenderer
                },
                block: BlockRenderer
            }}
        />
    );
};
export default SanityBlock;
