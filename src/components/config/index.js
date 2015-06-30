/**
 *
 *
 *
 *
 *
 * @type {exports}
 */


var path = require('path');
var _ = require('lodash');
var logger = require('log4js').getLogger('config.index');

var defaultsPath = path.resolve(path.join(__dirname, 'defaults.json'));
logger.info('looking for defaults at', defaultsPath);
var defaults = require(defaultsPath);

var overridesPath = path.resolve(process.env.SYSTEM_TEST_CONF || path.resolve(__dirname, '..', '..', '..','dev','overrides.json'));
logger.info('reading overrides from', overridesPath);

var overrides = {};
try{
    overrides = require(overridesPath);
}catch(e){
    console.log('could not read overrides at', overridesPath, 'using default configuration');
}

_.merge(exports, defaults, overrides);



