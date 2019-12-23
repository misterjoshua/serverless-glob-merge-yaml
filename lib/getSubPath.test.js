const getSubPath = require("./getSubPath").getSubPath;

const dataAtSubPath = "correct";
const testData = {
  sub: {
    path: dataAtSubPath
  }
};

it("should fetch the data at a subpath if present", () => {
  expect(getSubPath(testData, "sub.path")).toBe(dataAtSubPath);
});

it("should fetch the top level data if subpath is falsy", () => {
  expect(getSubPath(testData)).toBe(testData);
  expect(getSubPath(testData, undefined)).toBe(testData);
  expect(getSubPath(testData, "")).toBe(testData);
});
