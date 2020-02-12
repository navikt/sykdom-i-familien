import { LocaleRichTextObject, LocaleSimpleTextObject, LocaleStringObject } from '../locale-objects';
import { StringBlockValue } from '../parts';
import { Lenkeknapp } from '../objects';
import { InfopanelMedKnapper } from '../../../components/infopanelMedKnapper/InfopanelMedKnapper';

export const isStringBlockValue = (toBeDetermined: StringBlockValue | any): toBeDetermined is StringBlockValue => {
    if (toBeDetermined && typeof toBeDetermined === 'string') {
        return true;
    } else if (toBeDetermined && toBeDetermined instanceof Array) {
        return true; // TODO: Guard på alle items in array
    }
    return false;
};
export const isLocaleRichTextObject = (
    toBeDetermined: LocaleRichTextObject | any
): toBeDetermined is LocaleRichTextObject => {
    return !!(
        toBeDetermined &&
        toBeDetermined.nb &&
        isStringBlockValue(toBeDetermined.nb) &&
        toBeDetermined.nn &&
        isStringBlockValue(toBeDetermined.nn)
    );
};
export const isLocaleStringObject = (
    toBeDetermined: LocaleStringObject | any
): toBeDetermined is LocaleStringObject => {
    return !!(toBeDetermined && toBeDetermined.nb && toBeDetermined.nn);
};
export const isLocaleSimpleTextObject = (
    toBeDetermined: LocaleSimpleTextObject | any
): toBeDetermined is LocaleSimpleTextObject => {
    return !!(toBeDetermined && toBeDetermined.nb && toBeDetermined.nn);
};
export const isLenkeknapp = (toBeDetermined: Lenkeknapp | any): toBeDetermined is Lenkeknapp => {
    return !!(
        toBeDetermined &&
        toBeDetermined.text &&
        isLocaleSimpleTextObject(toBeDetermined.text) &&
        toBeDetermined.url &&
        typeof toBeDetermined.url === 'string'
    );
};
export const isListOfLenkeknapper = (toBeDetermined: Lenkeknapp[] | any): toBeDetermined is Lenkeknapp[] => {
    return toBeDetermined && toBeDetermined instanceof Array; // TODO: kjør isLenkeknapp for alle items in list.
};
export const isInfopanelMedKnapper = (
    toBeDetermined: InfopanelMedKnapper | any
): toBeDetermined is InfopanelMedKnapper => {
    return !!(
        toBeDetermined &&
        toBeDetermined._type &&
        typeof toBeDetermined._type === 'string' &&
        toBeDetermined.content &&
        isLocaleRichTextObject(toBeDetermined.content) &&
        toBeDetermined.title &&
        isLocaleStringObject(toBeDetermined.title) &&
        toBeDetermined.lenkeknapper &&
        isListOfLenkeknapper(toBeDetermined.lenkeknapper)
    );
};
