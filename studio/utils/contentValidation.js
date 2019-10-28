export const validateLocaleString = (obj, isRequired) => {
  if ((obj && obj.nb === undefined) || obj.nb === "") {
    return "Required field";
  }
  return true;
};
