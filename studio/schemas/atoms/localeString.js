import supportedLanguages from "../config/languages";

const LocaleString = {
  name: "localeString",
  type: "object",
  fieldsets: [
    {
      title: "Oversettelser",
      name: "translations",
      options: { collapsible: true }
    }
  ],
  fields: supportedLanguages.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: "string",
    fieldset: lang.isDefault ? null : "translations"
  }))
};

export default LocaleString;
