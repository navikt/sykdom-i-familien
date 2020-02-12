import { InfopanelMedKnapper, invalidInput } from '../InfopanelMedKnapper';
import { LocaleRichTextObject, LocaleStringObject, LocaleStringObject } from '../../../sanity/types/locale-objects';
import { StringBlockValue } from '../../../sanity/types/parts';
import { Lenkeknapp } from '../../../sanity/types/objects';
import { SanityContentHeadingLevel } from '../../../sanity/types';
import { isInfopanelMedKnapper } from '../../../sanity/types/guards';

const gyldigLocaleStringObject: LocaleStringObject = {
    nb: 'Bokmål',
    nn: 'Nynorsk'
};

const gyldigStringBlockValue: StringBlockValue = ['En', 'liste', 'av', 'strings'];
const gyldigStringBlockValueNynorsk: StringBlockValue = 'På nynorsk';

const gyldigLocaleRichTextObject: LocaleRichTextObject = {
    nb: gyldigStringBlockValue,
    nn: gyldigStringBlockValueNynorsk
};

const gyldigLocaleStringObject: LocaleStringObject = {
    nb: 'Norsk',
    nn: 'Nynorsk'
};

const gyldigLenkeknapp: Lenkeknapp = {
    text: gyldigLocaleStringObject,
    url: 'url string'
};

const gyldigLenkeknapper: Lenkeknapp[] = [gyldigLenkeknapp, gyldigLenkeknapp];

const gyldigInfopanelMedKnapper: InfopanelMedKnapper | any = {
    title: gyldigLocaleStringObject,
    content: gyldigLocaleRichTextObject,
    lenkeknapper: gyldigLenkeknapper,
    _type: 'infopanelMedKnapper'
};

const delvisUgyldigInfopanelMedKnapper: InfopanelMedKnapper | any = {
    title: gyldigLocaleStringObject,
    content: gyldigLocaleRichTextObject,
    lenkeknapper: gyldigLenkeknapper
};

const gyldigSanityContentHeadingLevel: SanityContentHeadingLevel = 4;
const ugyldigHeadingLevel: SanityContentHeadingLevel | any = 10;

describe(`verifiser typeguard`, () => {
    it(`is a valid inputpanelMedKnapper`, () => {
        expect(isInfopanelMedKnapper(gyldigInfopanelMedKnapper)).toBeTruthy();
    });

    it(`invalidInput git false hvis all input er gyldig`, () => {
        expect(invalidInput(gyldigInfopanelMedKnapper, gyldigSanityContentHeadingLevel)).toBeFalsy();
    });

    it(`invalidInput git true hvis input er helt eller delvis invalid`, () => {
        expect(invalidInput(gyldigInfopanelMedKnapper, ugyldigHeadingLevel)).toBeTruthy();
    });

    it(`invalidInput git true hvis infopanelMedKnapper er delvis ugyldig`, () => {
        expect(invalidInput(delvisUgyldigInfopanelMedKnapper, 10)).toBeTruthy();
    });
});
