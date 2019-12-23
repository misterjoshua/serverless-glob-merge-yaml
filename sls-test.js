const fs = require("fs");
const path = require("path");
const copyDir = require("copy-dir");
const temp = require("temp");
const exec = require("child_process").execSync;

// Track and delete temp files.
temp.track();

console.log("Creating temporary directory");
const tempDir = temp.mkdirSync("sls-test");
const testSrc = path.join(__dirname, "sls-test");
const testDest = path.join(tempDir, "sls-test");

console.log(`Creating sls-test in ${testDest}`);
copyDir.sync(testSrc, testDest);

const package = `serverless-glob-merge-yaml@file:${__dirname}`;
console.log(`Installing ${package} in ${testDest}`);
exec(`npm i ${package}`, { cwd: testDest });

console.log(`Running tests in ${testDest}`);
exec("npm test", { cwd: testDest });
