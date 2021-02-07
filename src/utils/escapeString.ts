export const escapeString = (s: string) => {
  const tagsToReplace: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
  };
  return s.replace(/[&<>]/g, function (tag) {
    return tagsToReplace[tag] || tag;
  });
};
