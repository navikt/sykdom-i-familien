import commonFieldsets from "../config/commonFieldsets";
import commonInternalFields from "../config/commonInternalFields";
import { contentFields } from "../objects/contentContainer";

const InternalCommon = {
  title: "Generelle tekster",
  name: "internalCommon",
  type: "document",
  fieldsets: commonFieldsets,
  fields: [...commonInternalFields, ...contentFields]
};

export default InternalCommon;
