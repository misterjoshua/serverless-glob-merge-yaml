import { lodashYamlMerger } from '../src/yamlFileMergers';

const testData = [
  { a: 'firstA', b: 'firstB', arr: ['first'] },
  { a: 'secondA', c: 'secondC' },
  { arr: ['third'] },
];

// it('should merge the yaml files recursively with deepmerge', () => {
//   const result: any = deepmergeYamlMerger(testData);
//   expect(result.a).toBe('secondA');
//   expect(result.b).toBe('firstB');
//   expect(result.c).toBe('secondC');
//   expect(result.arr).toEqual(expect.arrayContaining(['first', 'third']));
// });

it('should merge the yaml files recursively with lodash', () => {
  const result: any = lodashYamlMerger(testData);
  expect(result.a).toBe('secondA');
  expect(result.b).toBe('firstB');
  expect(result.c).toBe('secondC');
  expect(result.arr).toEqual(expect.arrayContaining(['first', 'third']));
});
