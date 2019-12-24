import { loadYamlFiles } from '../src/loadYamlFiles';

it('should merge several yamls', async () => {
  const loader = jest.fn().mockImplementation((filePath: string) => {
    if (filePath === 'throw') {
      throw new Error('throw');
    } else {
      return {};
    }
  });

  const allFiles = await loadYamlFiles(loader, [
    'first.yml',
    'second.yml',
    'third.yml',
    'throw',
  ]);
  expect(allFiles).toHaveLength(4);

  expect(loader).toBeCalledTimes(4);
  expect(loader).toHaveBeenCalledWith('first.yml');
  expect(loader).toHaveBeenCalledWith('second.yml');
  expect(loader).toHaveBeenCalledWith('third.yml');
  expect(loader).toHaveBeenCalledWith('throw');
});
