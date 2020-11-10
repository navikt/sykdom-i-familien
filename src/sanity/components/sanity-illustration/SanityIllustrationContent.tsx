import React from 'react';
import InlineSVG from '../../../components/elements/inline-svg/InlineSVG';
import { IllustrationDocument, OptimizedSvgNode } from '../../types/documents';
import { useStaticQuery, graphql } from 'gatsby';

interface Props {
    illustration: IllustrationDocument;
    title?: string;
    width?: string;
    height?: string;
    inline?: boolean;
    maintainAspectRatio?: boolean;
    viewBox?: string;
}

const getOptimizedSvgForIllustration = (
    illustration: IllustrationDocument,
    optimizedSvgs: OptimizedSvgNode[]
): string | undefined => {
    if (optimizedSvgs && illustration && illustration.children && illustration.children.length === 1) {
        const optimizedSvg = optimizedSvgs.find((o) => o.id === illustration.children[0]);
        if (optimizedSvg) {
            return optimizedSvg.svg;
        }
    }
    return undefined;
};

const SanityIllustration: React.FunctionComponent<Props> = ({ illustration, ...props }) => {
    const data = useStaticQuery(graphql`
        query {
            allOptimizedSvg {
                edges {
                    node {
                        id
                        svg
                    }
                }
            }
        }
    `);

    const allOptimizedSvgs: OptimizedSvgNode[] = data.allOptimizedSvg.edges.map((e: any) => ({
        id: e.node.id,
        svg: e.node.svg,
    }));

    const optimizedSvg = getOptimizedSvgForIllustration(illustration, allOptimizedSvgs);
    return illustration && illustration.svg ? (
        <InlineSVG {...props} illustration={optimizedSvg || illustration.svg} />
    ) : null;
};

export default SanityIllustration;
