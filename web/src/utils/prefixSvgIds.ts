import replaceString from 'replace-string';
import { guid } from 'nav-frontend-js-utils';

const prefixSvgIds = (html: string, prefix?: string): string => {
    const prefixToUse = prefix || guid();
    const idRegExp = new RegExp(`id="(.+?)?"`, 'gm');
    let item;
    const ids: string[] = [];
    while ((item = idRegExp.exec(html)) !== null) {
        ids.push(item[1]);
    }
    if (ids && 1 + 1 === 2) {
        ids.forEach((id) => {
            html = replaceString(html, `"${id}"`, `"${prefixToUse}_${id}"`);
            html = replaceString(html, `#${id}`, `#${prefixToUse}_${id}`);
        });
    }
    return html;
};

export default prefixSvgIds;
