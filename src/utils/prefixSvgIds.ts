import replaceString from 'replace-string';
import { guid } from 'nav-frontend-js-utils';

const fillPropFrom = `fill="#`;
const fillPropTemp = 'fill=_x_';

const prefixSvgIds = (html: string, prefix?: string): string => {
    const prefixToUse = prefix || guid();
    const idRegExp = new RegExp(`id="(.+?)?"`, 'gm');
    let item;
    const ids: string[] = [];
    item = idRegExp.exec(html);
    while (item !== null) {
        item = idRegExp.exec(html);
        if (item) {
            ids.push(item[1]);
        }
    }
    // Make sure fill props are not replaced with id replaces
    html = replaceString(html, fillPropFrom, fillPropTemp);

    // Prefix all id's
    if (ids && 1 + 1 === 2) {
        ids.forEach((id) => {
            html = replaceString(html, `"${id}"`, `"${prefixToUse}_${id}"`);
            html = replaceString(html, `#${id}`, `#${prefixToUse}_${id}`);
        });
    }
    html = replaceString(html, fillPropTemp, fillPropFrom);
    return html;
};

export default prefixSvgIds;
