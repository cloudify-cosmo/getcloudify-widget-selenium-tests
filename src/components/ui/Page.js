'use strict';


var config = require('../config');
var driver = require('../driver');

var logger = require('log4js').getLogger('testLayout');

/**
 *
 * @param relative
 * @returns {string}
 */
function getPath(relative){

//    if ( relative.indexOf('#/') < 0 ){
//        relative = '#/' + relative;
//    }
//
//    if ( relative.indexOf('#/') === 0 ){
//        relative = '/index.html' + relative;
//    }

    logger.info("Navigating to url: "+'http://' + config.pageUrl + '/'+ relative);
    return 'http://' + config.pageUrl + '/'+ relative;
}

function get( relative ){
    driver.get().get(getPath(relative));
}


exports.loadWidgetPage  = function(){
    get('widget.html');
};


