import { FileGlobber } from './fileGlobbers';
import { getSubPath } from './getSubPath';
import { loadYamlFiles } from './loadYamlFiles';
import { YamlLoader } from './yamlFileLoaders';
import { YamlMerger } from './yamlFileMergers';

export type VariableResolver = (variableString: string) => Promise<any>;

export const parseGlobMergeYamlVariable = (variableString: string) => {
  const [, pathGlob, subPath] = variableString.split(':');
  return [pathGlob, subPath];
};

// Resolve a serverless.yaml variable.
export const globMergeYaml = (
  yamlLoader: YamlLoader,
  yamlMerger: YamlMerger,
  fileGlobber: FileGlobber
): VariableResolver => async (variableString: string) => {
  const [pathGlob, subPath] = parseGlobMergeYamlVariable(variableString);

  const pathList = await fileGlobber(pathGlob);
  const allYamls = await loadYamlFiles(yamlLoader, pathList);
  const mergedYaml = yamlMerger(allYamls);

  return getSubPath(mergedYaml, subPath);
};
