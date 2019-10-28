import React from 'react';
import prefixSvgIds from '../../utils/prefixSvgIds';

interface Props {
    illustration: string;
    title?: string;
    width?: string;
    height?: string;
    inline?: boolean;
    maintainAspectRatio?: boolean;
    viewBox?: string;
}

export const getParsedSVGElement = (svgString: string): SVGElement | undefined => {
    const parser = new DOMParser();
    return parser.parseFromString(svgString, 'image/svg+xml').children[0] as SVGElement;
};

const setOrUpdateTitleNode = (svgElement: Element, title?: string): Element => {
    if (!title) {
        return svgElement;
    }
    const titleNode = svgElement.querySelector('title');
    const newTitleNode = document.createElement('title');
    newTitleNode.appendChild(document.createTextNode(title));
    if (titleNode) {
        svgElement.replaceChild(newTitleNode, titleNode);
    } else {
        svgElement.appendChild(newTitleNode);
    }
    return svgElement;
};

const setProp = (svgElement: Element, prop: string, value?: string) => {
    if (value) {
        svgElement.setAttribute(prop, value);
    } else {
        svgElement.removeAttribute(prop);
    }
};

const InlineSVG: React.FunctionComponent<Props> = ({ illustration, width, height, viewBox, title, inline = true }) => {
    const svgElement = getParsedSVGElement(prefixSvgIds(illustration));
    if (!svgElement) {
        return null;
    }
    setProp(svgElement, 'width', width || height ? width : '100%');
    setProp(svgElement, 'height', height);
    if (viewBox) {
        setProp(svgElement, 'viewBox', viewBox);
    }
    setOrUpdateTitleNode(svgElement, title);
    return (
        <div
            style={{ lineHeight: 0, display: inline ? 'inline-block' : 'block' }}
            dangerouslySetInnerHTML={{ __html: svgElement.outerHTML }}
        />
    );
};

export default InlineSVG;
