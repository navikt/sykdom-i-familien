import { guid } from 'nav-frontend-js-utils';
import replaceAll from 'replaceall';

const fillPropFrom = `fill="#`;
const fillPropTemp = 'fill=_x_';

const prefixSvgIds = (html: string, prefix?: string): string => {
    const idRegExp = new RegExp(`id="(.+?)?"`, 'gm');
    let item;
    const ids: string[] = [];
    item = idRegExp.exec(html);
    while (item !== null) {
        if (item) {
            ids.push(item[1]);
        }
        item = idRegExp.exec(html);
    }
    // Make sure fill props are not replaced with id replaces
    html = replaceAll(fillPropFrom, fillPropTemp, html);

    // Prefix all id's
    if (ids) {
        ids.forEach((id, idx) => {
            const prefixToUse = guid();
            const newId = `${idx}${prefixToUse}_${id}`;
            html = replaceAll(`"${id}"`, `"${newId}"`, html);
            html = replaceAll(`#${id}`, `#${newId}`, html);
        });
    }
    html = replaceAll(fillPropTemp, fillPropFrom, html);
    return html;
};

export default prefixSvgIds;
