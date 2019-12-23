const getSubPath = require("./getSubPath").getSubPath;
const mergeYamlFiles = require("./mergeYamlFiles").mergeYamlFiles;

// Resolve a serverless.yaml variable.
const globMergeYamlFilesVariableResolver = yamlLoader => async variableString => {
  const [, pathGlob, subPath] = variableString.split(":");
  const mergedYaml = await mergeYamlFiles(yamlLoader, pathGlob);
  const dataAtSubPath = getSubPath(mergedYaml, subPath);

  return dataAtSubPath;
};

exports.globMergeYamlVariableResolver = globMergeYamlFilesVariableResolver;
