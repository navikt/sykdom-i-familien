import BlockContent from '@sanity/block-content-to-react';
import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Undertittel } from 'nav-frontend-typografi';
import ExternalLinkIcon from '../../../components/elements/external-link-icon/ExternalLinkIcon';
import { BlockContentType } from '../../types/parts';
import './sanityBlock.less';
import { graphql, useStaticQuery } from 'gatsby';
import PdfLinkRenderer from './PdfLinkRenderer';

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
    if (props.node.style === 'title') {
        return (
            <div style={{ marginBottom: '.5rem', paddingTop: '1rem' }}>
                <Undertittel>{props.children}</Undertittel>
            </div>
        );
    }
    return <p>{props.children}</p>;
};
const LinkRenderer = (props: {
    children: React.ReactNode;
    mark: {
        linkNumber: number;
        href: string;
        isExternal: boolean;
    };
}) => {
    return (
        <Lenke
            href={props.mark.href}
            data-link-number={props.mark.linkNumber}
            className={props.mark.isExternal ? 'lenke--external' : undefined}>
            {props.children}
            {props.mark.isExternal && (
                <span className="lenke__externalIcon">
                    <ExternalLinkIcon />
                </span>
            )}
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
                    link: LinkRenderer,
                    pdfLink: PdfLinkRenderer,
                },
                block: BlockRenderer,
            }}
        />
    );
};
export default SanityBlock;
