import { ServerlessPlugin } from './ServerlessPlugin';

// XXX: CommonJS export. We can't use export default with this tsdx/rollup
// config. It transforms this to exports.default = ServerlessPlugin;
// export default ServerlessPlugin;

// Export ServerlessPlugin
module.exports = ServerlessPlugin;
