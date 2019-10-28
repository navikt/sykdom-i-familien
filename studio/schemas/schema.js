// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import svgUploadPreview from "sanity-plugin-inline-svg";

import atoms from "./atoms";
import documents from "./documents";
import objects from "./objects";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    svgUploadPreview,
    ...atoms,
    ...documents,
    ...objects
  ])
});
