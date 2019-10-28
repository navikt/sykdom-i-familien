import commonFieldsets from "../config/commonFieldsets";
import commonInternalFields from "../config/commonInternalFields";

const Ytelse = {
  title: "Ytelse",
  name: "ytelse",
  type: "document",
  fieldsets: commonFieldsets,
  fields: [
    ...commonInternalFields,
    {
      title: "Kode",
      name: "key",
      type: "string",
      fieldset: "internal"
    }
  ]
};

export default Ytelse;
