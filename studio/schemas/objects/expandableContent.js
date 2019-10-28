import commonFieldsets from "../config/commonFieldsets";
import commonInternalFields from "../config/commonInternalFields";
import { validateLocaleString } from "../../utils/contentValidation";
import { titleField } from "./contentContainer";

const ExpandableContent = {
  title: "Ekspanderbart innhold",
  name: "expandableContent",
  type: "object",
  fieldsets: commonFieldsets,
  fields: [
    ...commonInternalFields,
    titleField,
    {
      title: "Innhold",
      name: "content",
      type: "localeBlock"
    }
  ]
};

export default ExpandableContent;
