const ServerlessPlugin = require('../src/index');

it('should provide a commonjs export', () => {
  expect(ServerlessPlugin.name).toBe('ServerlessPlugin');
});
