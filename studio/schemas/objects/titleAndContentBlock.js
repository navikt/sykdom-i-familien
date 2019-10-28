import { defaultLanguage } from "../config/languages";

const titleHasValue = title => {
  return (
    title !== undefined &&
    title[defaultLanguage] !== undefined &&
    title[defaultLanguage] !== ""
  );
};

const TitleAndContentBlock = {
  title: "Innhold",
  name: "titleAndContentBlock",
  type: "object",
  fieldsets: [{ name: "setup", title: "Oppsett" }],
  fields: [
    {
      title: "Illustrasjon",
      name: "tabIllustration",
      type: "reference",
      to: [
        {
          type: "illustration"
        }
      ],
      fieldset: "setup"
    },
    {
      title: "Ekstratittel (overstyrer innholdets tittel)",
      name: "title",
      type: "localeString",
      fieldset: "setup"
    },
    {
      title: "Innhold",
      name: "content",
      type: "contentContainer"
    }
  ],
  preview: {
    select: {
      title: "title",
      content: "content"
    },
    prepare(props) {
      const { title: overrideTitle, content } = props;
      const title = titleHasValue(overrideTitle)
        ? overrideTitle
        : content.title;
      return {
        title: titleHasValue(title) ? title[defaultLanguage] : "Uten tittel"
      };
    }
  }
};

export default TitleAndContentBlock;
