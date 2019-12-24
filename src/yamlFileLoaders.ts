import Serverless from 'serverless';

export type YamlLoader = (path: string) => Promise<object>;

// Use the Serverless Framework's yaml parser.
export const serverlessYamlFileLoader = (
  serverless: Serverless
): YamlLoader => async (path: string): Promise<object> =>
  await serverless.yamlParser.parse(path);
