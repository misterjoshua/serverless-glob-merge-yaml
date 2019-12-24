import { globMergeYaml } from '../src/variableResolvers';

interface TestData {
  [x: string]: object;
}
const testData: TestData = {
  'one.yml': { which: 'one' },
  'two.yml': { which: 'two' },
  'three.yml': { which: 'three' },
};

it('should orchestrate loading, merging, and all that', async () => {
  const fileGlobberMock = jest.fn(async () => [
    'one.yml',
    'two.yml',
    'three.yml',
  ]);
  const yamlLoaderMock = jest.fn(
    async (file: string): Promise<object> => testData[file]
  );
  const yamlMergerMock = jest.fn().mockReturnValue({ done: true });

  const resolver = globMergeYaml(
    yamlLoaderMock,
    yamlMergerMock,
    fileGlobberMock
  );

  expect(await resolver('foo:**/*')).toEqual(
    expect.objectContaining({ done: true })
  );

  expect(fileGlobberMock).toHaveBeenCalledWith('**/*');

  expect(yamlLoaderMock).toHaveBeenCalledWith('one.yml');
  expect(yamlLoaderMock).toHaveBeenCalledWith('two.yml');
  expect(yamlLoaderMock).toHaveBeenCalledWith('three.yml');

  expect(yamlMergerMock).toHaveBeenCalledWith(
    expect.arrayContaining([
      expect.objectContaining(testData['one.yml']),
      expect.objectContaining(testData['two.yml']),
      expect.objectContaining(testData['three.yml']),
    ])
  );
});
