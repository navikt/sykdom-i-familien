import { titleField } from "./contentContainer";
import { defaultLanguage } from "../config/languages";

const GroupedContent = {
  title: "Gruppert innhold",
  name: "groupedContent",
  type: "document",
  fieldsets: [{ name: "render", title: "Presentasjon" }],
  fields: [
    {
      ...titleField,
      description: "Tittel vises avhengig av hvilken visningsform som velges."
    },
    {
      title: "Hvordan skal informasjonen vises",
      name: "presentation",
      type: "string",
      fieldset: "render",
      options: {
        layout: "radio",
        list: [
          { value: "tabs", title: "Faner" },
          { value: "dropdown", title: "Nedtrekksliste" }
        ]
      }
    },

    {
      title: "Innhold",
      name: "content",
      type: "array",
      of: [
        {
          type: "titleAndContentBlock"
        }
      ]
    }
  ],
  preview: {
    select: {
      title: "title"
    },
    prepare(props) {
      return {
        title: props.title[defaultLanguage]
      };
    }
  }
};

export default GroupedContent;
