import { globModuleGlobber } from '../src/fileGlobbers';

jest.mock('glob', () => ({
  sync: async () => ['one', 'two', 'three'],
}));

it('should use glob and return all results', async () => {
  const results = await globModuleGlobber('**/*');
  expect(results).toEqual(expect.arrayContaining(['one', 'two', 'three']));
});
