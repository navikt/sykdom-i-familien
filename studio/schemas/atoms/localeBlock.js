import supportedLanguages from "../config/languages";

const LocaleBlock = {
  name: "localeBlock",
  type: "object",
  fieldsets: [
    {
      name: "translations",
      title: "Oversettelser",
      options: { collapsible: true }
    }
  ],
  fields: supportedLanguages.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: "array",
    of: [{ type: "block" }],
    fieldset: lang.isDefault ? null : "translations"
  }))
};

export default LocaleBlock;
