import supportedLanguages from "../config/languages";

const LocaleText = {
  name: "localeText",
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
    type: "text",
    fieldset: lang.isDefault ? null : "translations"
  }))
};

export default LocaleText;
