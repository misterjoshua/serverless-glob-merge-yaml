const fs = require("fs");
const path = require("path");
const lodash = require("lodash");

const cfnJson = fs.readFileSync(
  path.join(
    __dirname,
    "..",
    ".serverless",
    "cloudformation-template-update-stack.json"
  )
);
const cfn = JSON.parse(cfnJson);

it("should have loaded the cloudformation", () => {
  expect(cfn).toBeDefined();
  expect(Object.keys(cfn)).toEqual(
    expect.arrayContaining([
      "resourcesCase",
      "functionsCase",
      "envCase",
      "iamRoleStatementsCase"
    ])
  );
});

it("should have all resources", () => {
  const resourcesCase = cfn.resourcesCase;
  expect(resourcesCase).toBeDefined();
  expect(resourcesCase).toHaveProperty(["TestQueue"]);
  expect(resourcesCase).not.toHaveProperty(["ShouldntExist"]);
  expect(resourcesCase.TestQueue.Type).toBe("AWS::SQS::Queue");
});

it("should have all functions", () => {
  const functionsCase = cfn.functionsCase;
  expect(functionsCase).toBeDefined();
  expect(Object.keys(functionsCase)).toEqual(
    expect.arrayContaining(["mod1fn", "mod2fn", "mod2fn2", "mod3fn"])
  );
});

it("should have all envs", () => {
  console.log(cfn.envCase);
  expect(cfn.envCase.FOO).toBe("BAR");
  expect(cfn.envCase.BAZ).toBe("XYZ");
  expect(cfn.envCase.ORDER).toBe("RIGHT");
});

it("should have all iamRoleStatements", () => {
  expect(cfn.iamRoleStatementsCase).toHaveLength(2);
  expect(cfn.iamRoleStatementsCase[0].Effect).toBe("Allow");
});
