import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import Lenke from 'nav-frontend-lenker';
import { BlockContentType } from '../../types/parts';
import { Undertittel } from 'nav-frontend-typografi';

interface Props {
    content: BlockContentType;
}

const ListItemRenderer = (props: { children: React.ReactNode; node: { style: string } }) => {
    return <li className={props.node.style}>{props.children}</li>;
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

const BlockRenderer = (props: any) => {
    if (props.node.style === 'title') {
        return <Undertittel>{props.children}</Undertittel>;
    }
    return <p>{props.children}</p>;
};

const SanityBlock: React.FunctionComponent<Props> = ({ content }) => (
    <BlockContent
        blocks={content}
        serializers={{
            block: BlockRenderer,
            listItem: ListItemRenderer,
            marks: {
                link: LinkRenderer
            }
        }}
    />
);

export default SanityBlock;
