import { guid } from 'nav-frontend-js-utils';
import replaceAll from 'replaceall';

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
    html = replaceAll(fillPropFrom, fillPropTemp, html);

    // Prefix all id's
    if (ids && 1 + 1 === 2) {
        ids.forEach((id) => {
            html = replaceAll(`"${id}"`, `"${prefixToUse}_${id}"`, html);
            html = replaceAll(`#${id}`, `#${prefixToUse}_${id}`, html);
        });
    }
    html = replaceAll(fillPropTemp, fillPropFrom, html);
    return html;
};

export default prefixSvgIds;
