import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Lenke from 'nav-frontend-lenker';
import ExternalLinkIcon from '../../../components/elements/external-link-icon/ExternalLinkIcon';

interface PdfLinkMark {
    reference: {
        children: string[];
    };
}

interface PdfLink {
    id: string;
    url: string;
}

interface Props {
    children: React.ReactNode;
    mark: PdfLinkMark;
}

const getPdfUrl = (ref: PdfLinkMark, links: PdfLink[] = []): string | undefined => {
    const refId =
        ref?.reference?.children && ref?.reference?.children.length === 1 ? ref?.reference?.children[0] : undefined;
    const link = refId ? links.find((pl) => pl.id === refId) : undefined;
    return link && link.url ? link.url : undefined;
};

const PdfLinkRenderer = (props: Props) => {
    const data = useStaticQuery(graphql`
        query {
            allPdfLink {
                edges {
                    node {
                        id
                        url
                    }
                }
            }
        }
    `);
    const allPdfLinks: PdfLink[] = data.allPdfLink.edges.map((e: any) => ({
        id: e.node.id,
        url: e.node.url,
    }));

    const href = getPdfUrl(props.mark, allPdfLinks);

    return href ? (
        <Lenke target="_blank" href={href} className="lenke--external">
            {props.children}
            <span className="lenke__externalIcon">
                <ExternalLinkIcon />
            </span>
        </Lenke>
    ) : (
        <>{props.children}</>
    );
};

export default PdfLinkRenderer;
