import { TitleAndTextType, ExpandableContentType, VeilederpanelType } from '../objects';
import { IllustrationType } from '../documents';

export type StringBlockValue = string | string[];
export type Text = string;
export type BlockContentType = Array<ExpandableContentType | IllustrationType | VeilederpanelType | TitleAndTextType>;
