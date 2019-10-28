import { validateLocaleString } from "../../utils/contentValidation";
import { titleField } from "./contentContainer";

const TitleAndText = {
  title: "Tittel og tekst",
  name: "titleAndText",
  type: "object",
  fields: [
    titleField,
    {
      title: "Innhold",
      name: "content",
      type: "localeBlock"
    }
  ],
  preview: {
    select: {
      title: "title"
    },
    prepare(values) {
      return {
        title: values.title.nb
      };
    }
  }
};

export default TitleAndText;
