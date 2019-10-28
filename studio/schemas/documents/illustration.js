import React from "react";
import IllustrationContentIcon from "../../plugins/IllustrationContentIcon";
import commonFieldsets from "../config/commonFieldsets";
import commonInternalFields from "../config/commonInternalFields";

// const IllustrationIcon = props => (
//   <svg width={36} height={35} {...props}>
//     <g fill="#0067C5" fillRule="evenodd">
//       <path d="M30.566 9.72v20.508H8.043V35h27.348l.07-25.28z" />
//       <path d="M28.957 23.864H0v4.772h28.957zM8.043 4.773c1.773 0 3.218 1.425 3.218 3.182 0 1.754-1.445 3.181-3.218 3.181-1.774 0-3.217-1.427-3.217-3.181 0-1.757 1.443-3.182 3.217-3.182zm1.723 9.932a.808.808 0 011.308-.1l3.202 3.799 3.492-7.597a.807.807 0 011.478.033l4.624 11.433h5.087V0H0v22.273h5.175l4.591-7.568z" />
//     </g>
//   </svg>
// );

const Illustration = {
  title: "Illustrasjon",
  name: "illustration",
  type: "document",
  fieldsets: commonFieldsets,
  fields: [
    ...commonInternalFields,
    {
      title: "Beskrivelse",
      name: "description",
      type: "string"
    },
    {
      title: "SVG",
      name: "svg",
      type: "svgUploadPreview"
    }
  ],
  preview: {
    select: {
      name: "name",
      description: "description",
      svg: "svg"
    },
    prepare(props) {
      return {
        title: props.name,
        subtitle: props.description ? props.description : undefined,
        media: <IllustrationContentIcon svg={props.svg} />
      };
    }
  }
};

export default Illustration;
