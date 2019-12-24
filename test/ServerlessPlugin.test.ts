import { ServerlessPlugin } from '../src/ServerlessPlugin';
import Serverless, { Options } from 'serverless';

it('should register variable resolvers', () => {
  const plugin = new ServerlessPlugin(
    ({} as any) as Serverless,
    ({} as any) as Options
  );

  expect(plugin.variableResolvers).toHaveProperty('glob-merge-yaml');
  expect(plugin.variableResolvers['glob-merge-yaml']).toHaveProperty(
    'resolver'
  );
});
