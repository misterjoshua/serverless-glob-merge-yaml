// import deepmerge from 'deepmerge';
import lodashMergeWith from 'lodash/mergeWith';

export type YamlMerger = (yamlFiles: object[]) => object;

// export const deepmergeYamlMerger: YamlMerger = yamlFiles =>
//   deepmerge.all(yamlFiles);

export const lodashYamlMerger: YamlMerger = yamlFiles =>
  yamlFiles.reduce(
    (accumulator, yamlFile) =>
      lodashMergeWith(accumulator, yamlFile, (obj: any, src: any) =>
        Array.isArray(obj) && Array.isArray(src) ? obj.concat(src) : undefined
      ),
    {}
  );
