export const isPathRoute = (arr, target) => {
  if (arr.every((r) => target.includes(r))) {
    return true;
  }

  return false;
};
