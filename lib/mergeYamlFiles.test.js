const mergeYamlFiles = require("./mergeYamlFiles").mergeYamlFiles;
const glob = require("glob");

jest.mock("glob", () => {
  return {
    sync: jest.fn().mockReturnValue(["first.yml", "second.yml", "throw"])
  };
});

it("should merge several yamls", async () => {
  const loader = jest
    .fn()
    .mockReturnValueOnce({ a: "firstA", b: "firstB" })
    .mockReturnValueOnce({ a: "secondA", c: "secondC" })
    .mockImplementation(() => {
      throw new Error("throw");
    });

  const result = await mergeYamlFiles(loader, "**/*.ts");

  // Make sure the merge function calls sync
  expect(glob.sync).toBeCalledTimes(1);
  expect(loader).toBeCalledTimes(3);
  expect(loader).toHaveBeenCalledWith("first.yml");
  expect(loader).toHaveBeenCalledWith("second.yml");
  expect(loader).toHaveBeenCalledWith("throw");

  expect(result.a).toBe("secondA");
  expect(result.b).toBe("firstB");
  expect(result.c).toBe("secondC");
});
