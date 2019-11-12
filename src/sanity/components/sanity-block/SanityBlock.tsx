import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import Lenke from 'nav-frontend-lenker';
import { BlockContentType } from '../../types/parts';

interface Props {
    content: BlockContentType;
}

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

const SanityBlock: React.FunctionComponent<Props> = ({ content }) => (
    <BlockContent
        blocks={content}
        serializers={{
            marks: {
                link: LinkRenderer
            }
        }}
    />
);

export default SanityBlock;
