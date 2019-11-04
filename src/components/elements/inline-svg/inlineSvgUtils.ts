import { InlineSVGProps } from './InlineSVG';
import prefixSvgIds from '../../../utils/prefixSvgIds';
import { isBrowser } from '../../../utils/build';
import { parse } from 'svg-parser';
const toHtml = require('hast-util-to-html');

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

const setPropOnElement = (element: any, prop: string, value?: string) => {
    if (value) {
        element.properties[prop] = value;
    } else {
        delete element.properties[prop];
    }
};

const parseInBrowser = ({ illustration, width, height, viewBox, title }: InlineSVGProps): string | undefined => {
    const parser = new DOMParser();
    const svgElement = parser.parseFromString(prefixSvgIds(illustration), 'image/svg+xml').children[0] as SVGElement;
    if (!svgElement) {
        return;
    }
    setProp(svgElement, 'width', width || height ? width : '100%');
    setProp(svgElement, 'height', height);
    setProp(svgElement, 'focusable', 'false');
    if (viewBox) {
        setProp(svgElement, 'viewBox', viewBox);
    }
    setOrUpdateTitleNode(svgElement, title);
    return svgElement.outerHTML;
};

const parseOnNode = ({ illustration, width, height, viewBox, title }: InlineSVGProps): string | undefined => {
    const element = parse(illustration).children[0] as any;
    setPropOnElement(element, 'width', width || height ? width : '100%');
    setPropOnElement(element, 'height', height);
    setPropOnElement(element, 'focusable', 'false');
    if (viewBox) {
        setPropOnElement(element, 'viewBox', viewBox);
    }
    if (title) {
        element.children = element.children.map((child: any) => {
            if (child.tagName === 'title') {
                child.children[0].value = 'whoa';
            }
            return child;
        });
    }
    return toHtml(element);
};

export const parseAndModifySvg = (props: InlineSVGProps): string | undefined => {
    if (isBrowser) {
        return parseInBrowser(props);
    }
    return parseOnNode(props);
};
