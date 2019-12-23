const globMergeYamlVariableResolver = require("./globMergeYamlVariableResolver")
  .globMergeYamlVariableResolver;

// const yamlBoost = require("yaml-boost");
// Use the serverless yaml parser.
const serverlessLoader = serverless => async path =>
  await serverless.yamlParser.parse(path);
// Use the yaml-boost yaml parser.
// const yamlBoostLoader = async path => yamlBoost.load(path);
// Serverless Framework plugin.
class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.variableResolvers = {
      "glob-merge-yaml": {
        resolver: globMergeYamlVariableResolver(serverlessLoader(serverless))
      }
      // "glob-merge-yaml-boost": {
      //   resolver: globMergeYamlVariableResolver(yamlBoostLoader)
      // }
    };
  }
}
exports.ServerlessPlugin = ServerlessPlugin;
