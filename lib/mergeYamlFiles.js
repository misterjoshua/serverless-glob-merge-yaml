const glob = require("glob");

// Use a yaml loader to load all yaml files matching the path glob and merge them.
const mergeYamlFiles = async (yamlLoader, pathGlob) => {
  const filePaths = glob.sync(pathGlob);
  const allYamls = await Promise.all(
    filePaths.map(async filePath => {
      try {
        return await yamlLoader(filePath);
      } catch (e) {
        console.log(`Error loading ${filePath}: `, e);
        return {};
      }
    })
  );

  return Object.assign({}, ...allYamls);
};

exports.mergeYamlFiles = mergeYamlFiles;
