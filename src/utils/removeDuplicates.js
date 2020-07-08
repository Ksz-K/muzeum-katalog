const removeDuplicatesBy = (keyFn, array) => {
  let mySet = new Set();
  return array.filter(function (x) {
    let key = keyFn(x),
      isNew = !mySet.has(key);
    if (isNew) mySet.add(key);
    return isNew;
  });
};

export default removeDuplicatesBy;
