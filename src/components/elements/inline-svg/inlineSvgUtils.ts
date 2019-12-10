import { InlineSVGProps } from './InlineSVG';
import prefixSvgIds from '../../../utils/prefixSvgIds';
import replaceAll from 'replaceall';

export const parseAndModifySvg = (props: InlineSVGProps): string | undefined => prefixSvgIds(stringParseSVG(props));

/** Rude string prop replacements */
const findProp = (str: string, name: string): string | undefined => {
    const propPattern = `${name}=\"(.*?)\"`;
    const regExp = new RegExp(propPattern, 'i');
    const result = regExp.exec(str);
    if (result) {
        return result[0];
    }
    return undefined;
};

const findNode = (str: string, name: string): string | undefined => {
    const propPattern = `<${name}?>(.*?)<\/${name}>`;
    const regExp = new RegExp(propPattern, 'i');
    const result = regExp.exec(str);
    if (result) {
        return result[0];
    }
    return undefined;
};

const removeProp = (tag: string, prop: string): string => {
    const currProp = findProp(tag, prop);
    if (currProp) {
        return replaceAll(currProp, ``, tag);
    }
    return tag;
};

const setProp = (tag: string, name: string, newValue?: string): string => {
    const currProp = findProp(tag, name);
    const newProp = `${name}="${newValue}"`;
    if (currProp) {
        return replaceAll(currProp, newProp, tag);
    } else if (newValue) {
        return `${tag.replace('>', '')} ${newProp}>`;
    }
    return tag;
};

const updateSvgProps = (svgTag: string, props: InlineSVGProps): string => {
    let tag = svgTag;
    if (props.height) {
        tag = setProp(tag, 'height', props.height);
    }
    if (props.width) {
        tag = setProp(tag, 'width', props.width);
    }
    tag = setProp(tag, 'focusable', 'false');
    tag = removeProp(tag, 'xmlns:xlink');
    tag = removeProp(tag, 'xmlns');
    tag = removeProp(tag, 'version');

    return tag;
};

const updateSvgNodes = (str: string, props: InlineSVGProps) => {
    if (props.title) {
        const newTitleNode = `<title>${props.title}</title>`;
        const titleNode = findNode(str, 'title');
        if (titleNode) {
            str = str.replace(titleNode, newTitleNode);
        } else {
            str = `${titleNode}${str}`;
        }
    }
    return str;
};

export const stringParseSVG = (props: InlineSVGProps): string => {
    const str = props.illustration.replace(/<\?xml(.*?)\?>/, '');
    const svgNodeStr = /<svg (.*?)>/.exec(str);
    if (svgNodeStr) {
        let svgNode = svgNodeStr[0];
        let contentNode = str.replace(svgNode, '').replace('</svg>', '');
        svgNode = updateSvgProps(svgNode, props);
        contentNode = updateSvgNodes(contentNode, props);
        return `
            ${svgNode}
            ${contentNode}
        </svg>`;
    }
    return str;
};
