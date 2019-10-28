import React from "react";

export const getParsedSVGElement = svgString => {
  const parser = new DOMParser();
  return parser.parseFromString(svgString, "image/svg+xml").children[0];
};

const setProp = (svgElement, prop, value) => {
  if (value) {
    svgElement.setAttribute(prop, value);
  } else {
    svgElement.removeAttribute(prop);
  }
};

const IllustrationContentIcon = props => {
  const { svg } = props;
  const svgElement = svg ? getParsedSVGElement(svg) : undefined;
  if (!svgElement) {
    return null;
  }
  setProp(svgElement, "width", "32px");
  return (
    <div
      style={{ lineHeight: 0, display: "inline-block" }}
      dangerouslySetInnerHTML={{ __html: svgElement.outerHTML }}
    />
  );
};

export default IllustrationContentIcon;
