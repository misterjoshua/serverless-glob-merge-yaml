import Serverless from 'serverless';
import { serverlessYamlFileLoader } from '../src/yamlFileLoaders';

it('should use the given serverless yaml parser', async () => {
  const sls: Serverless = ({
    yamlParser: { parse: jest.fn(async () => 42) },
  } as any) as Serverless;

  const loader = serverlessYamlFileLoader(sls);

  expect(await loader('foo')).toEqual(42);
  expect(sls.yamlParser.parse).toHaveBeenCalledTimes(1);
  expect(sls.yamlParser.parse).toHaveBeenCalledWith('foo');
});
