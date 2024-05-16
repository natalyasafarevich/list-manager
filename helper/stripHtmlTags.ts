export const stripHtmlTags = (html: string) => {
  const regex = /(<([^>]+)>)/gi;
  return html.replace(regex, '');
};
