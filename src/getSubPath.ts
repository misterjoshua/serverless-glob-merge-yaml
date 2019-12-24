import lodashGet from 'lodash/get';

export const getSubPath = (
  mergedYaml: object,
  subPath: string | undefined = undefined
) => {
  return subPath ? lodashGet(mergedYaml, subPath) : mergedYaml;
};
