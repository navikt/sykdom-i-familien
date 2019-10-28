import { validateLocaleString } from "../../utils/contentValidation";

export const titleField = {
  title: "Tittel",
  name: "title",
  type: "localeString",
  validation: Rule =>
    Rule.custom(obj => {
      return validateLocaleString(obj, true);
    })
};

export const contentField = {
  title: "Innhold",
  name: "content",
  type: "array",
  of: [
    {
      type: "block"
    },
    {
      type: "illustration"
    },
    { type: "titleAndText" },
    { type: "expandableContent" },
    { type: "veilederpanel" },
    { type: "groupedContent" },
    {
      type: "reference",
      to: { type: "internalCommon", title: "Felles" }
    }
  ]
};
export const contentFields = [titleField, contentField];

const ContentContainer = {
  title: "Innhold",
  name: "contentContainer",
  type: "object",
  fields: [...contentFields]
};

export default ContentContainer;
