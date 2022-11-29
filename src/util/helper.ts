export const getImageFromURL = (imgUrl: string | undefined) =>
  imgUrl && imgUrl.startsWith('http') ? imgUrl : `/src/assets/${imgUrl}`;

export default {getImageFromURL};
