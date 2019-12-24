import { YamlLoader } from './yamlFileLoaders';

export const loadYamlFiles = async (
  yamlFileLoader: YamlLoader,
  pathList: string[]
): Promise<object[]> =>
  Promise.all(
    pathList.map(async filePath => {
      try {
        return yamlFileLoader(filePath);
      } catch (e) {
        // log(`Error loading ${filePath}: `, e);
        return {};
      }
    })
  );
