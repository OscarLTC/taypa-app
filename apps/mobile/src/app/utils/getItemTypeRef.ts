export const getItemTypeRef = (type: string) => {
  return type === 'dish'
    ? 'dishes'
    : type === 'drink'
    ? 'drinks'
    : 'additional';
};
