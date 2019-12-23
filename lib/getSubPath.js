const lodash = require("lodash");

// Get the data at a subpath.
const getSubPath = (mergedYaml, subPath) => {
  if (!subPath) {
    return mergedYaml;
  } else {
    return lodash.get(mergedYaml, subPath);
  }
};

exports.getSubPath = getSubPath;
