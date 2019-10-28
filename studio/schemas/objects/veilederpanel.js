import commonFieldsets from "../config/commonFieldsets";
import commonInternalFields from "../config/commonInternalFields";

const Veilederpanel = {
  title: "Veilederpanel",
  name: "veilederpanel",
  type: "object",
  fieldsets: [...commonFieldsets, { name: "veileder", title: "Veileder" }],
  fields: [
    ...commonInternalFields,
    {
      title: "Ansikt",
      name: "face",
      type: "string",
      fieldset: "veileder",
      options: {
        layout: "radio",
        list: [
          { value: "glad", title: "Glad" },
          { value: "undrende", title: "Undrende" },
          { value: "skeptisk", title: "Skeptisk" }
        ]
      }
    },
    {
      title: "Fargetema",
      name: "color",
      type: "string",
      fieldset: "veileder",
      options: {
        layout: "radio",
        list: [
          { value: "normal", title: "Normal", isDefault: true },
          { value: "suksess", title: "Suksess" },
          { value: "advarsel", title: "Advarsel" },
          { value: "feilmelding", title: "Feilmelding" }
        ]
      }
    },
    {
      title: "Innhold",
      name: "content",
      type: "localeBlock"
    }
  ]
};

export default Veilederpanel;
