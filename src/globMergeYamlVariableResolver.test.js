const globMergeYamlVariableResolver = require("./globMergeYamlVariableResolver")
  .globMergeYamlVariableResolver;
const mergeYamlFiles = require("./mergeYamlFiles").mergeYamlFiles;

jest.mock("./mergeYamlFiles", () => {
  return {
    mergeYamlFiles: jest.fn().mockReturnValue({ mock: "mockValue" })
  };
});

it("", async () => {
  const loader = jest.fn();
  expect(
    await globMergeYamlVariableResolver(loader)("whatever:**/*:mock")
  ).toBe("mockValue");
  expect(mergeYamlFiles).toHaveBeenCalledWith(loader, "**/*");
});
