// Converts the object into an array if it is not an array and returns it
export const convertToArray = (object) => {
  return !Array.isArray(object) ? [object] : object;
}

// Takes n strings and n - 1 delimiters and returns their consecutive concatenation
export const joinWithDelimiters = (strings, delimiters) => {
  if (delimiters.length === 1) return [strings[0], strings[1]].join(delimiters[0]);
  return joinWithDelimiters([[strings[0], strings[1]].join(delimiters[0]), ...strings.slice(2)], delimiters.slice(1));
}
