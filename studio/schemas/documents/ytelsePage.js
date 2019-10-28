import commonFieldsets from "../config/commonFieldsets";
import commonInternalFields from "../config/commonInternalFields";

const YtelsePage = {
  title: "Faktaside",
  name: "page",
  type: "document",
  fieldsets: commonFieldsets,
  fields: [
    ...commonInternalFields,
    {
      title: "Ytelse",
      name: "ytelse",
      type: "reference",
      fieldset: "internal",
      to: { type: "ytelse" }
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title"
      }
    },
    {
      title: "Tittel",
      name: "title",
      type: "localeString"
    },
    {
      title: "Kort fortalt",
      name: "inShort",
      type: "localeBlock"
    },
    {
      title: "Illustrasjon",
      name: "illustration",
      type: "reference",
      to: { type: "illustration" }
    },
    {
      title: "Innholdsseksjoner",
      name: "content",
      type: "array",
      of: [{ type: "section" }]
    }
  ]
};

export default YtelsePage;
