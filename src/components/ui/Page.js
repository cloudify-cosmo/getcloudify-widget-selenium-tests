'use strict';

var logger = require('log4js').getLogger('testLayout');

exports.loadWidgetPage  = function( mockIp ){
    if ( mockIp ) {
        browser.get('/widget.html?mockIp=' + mockIp );
    }else{
        browser.get('/widget.html');
    }
};

exports.submit = function() {
    return element(by.css('#tryNowBtn')).click();
};


exports.fillForm = function( name, email ) {
    try {
        logger.info('sending email');
        return element(by.model('widgetController.email')).isDisplayed().then(function( displayed ){
            if ( displayed ){

                element(by.model('widgetController.email')).sendKeys(email);
                return element(by.model('widgetController.name')).sendKeys(name);
            }

            logger.info('email is not visible');
            return  element(by.model('widgetController.email')).isDisplayed();

        });


    }catch(e){
        console.log('catch was triggered',e);
    }

};

exports.getIp = function(){
    return element(by.css('[ng-bind="widgetController.machineIp"]')).getText();

};





