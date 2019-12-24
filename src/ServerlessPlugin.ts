import Serverless, { Options } from 'serverless';
import Plugin from 'serverless/classes/Plugin';
import { globMergeYaml, VariableResolver } from './variableResolvers';
import { globModuleGlobber } from './fileGlobbers';
import { lodashYamlMerger } from './yamlFileMergers';
import { serverlessYamlFileLoader } from './yamlFileLoaders';

export interface VariableResolvers {
  [x: string]: {
    resolver: VariableResolver;
  };
}

export class ServerlessPlugin implements Plugin {
  hooks: Plugin.Hooks = {};
  commands?: Plugin.Commands | undefined;
  variableResolvers: VariableResolvers;
  serverless: Serverless;
  options: Options;

  constructor(serverless: Serverless, options: Options) {
    this.serverless = serverless;
    this.options = options;
    this.variableResolvers = {
      'glob-merge-yaml': {
        resolver: globMergeYaml(
          serverlessYamlFileLoader(serverless),
          lodashYamlMerger,
          globModuleGlobber
        ),
      },
    };
  }
}
