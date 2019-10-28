import { contentField, titleField } from "./contentContainer";

const SectionContentType = {
  title: "Seksjon",
  name: "section",
  type: "object",
  fields: [
    titleField,
    {
      title: "Illustrasjon",
      name: "illustration",
      type: "reference",
      to: { type: "illustration" }
    },
    contentField
  ],
  preview: {
    select: {
      title: "title"
    },
    prepare(props) {
      return {
        title: props.title.nb
      };
    }
  }
};

export default SectionContentType;
