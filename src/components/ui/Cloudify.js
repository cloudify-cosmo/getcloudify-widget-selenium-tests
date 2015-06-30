'use strict';


var logger = require('log4js').getLogger('Cloudify');

exports.loadBlueprints = function(){
    browser.get('/');
};

exports.deployBlueprint = function( deploymentId ){
    element(by.css('.deploy-button')).click();
    element(by.model('deployment_id')).sendKeys(deploymentId ||  ( 'automated-test' + new Date().geTime() ) );
    element(by.css('#deployBtn')).click();

};

exports.installDeployment = function(){
    browser.sleep(5000);
    element(by.model('selectedWorkflow.data')).click();
    browser.sleep(2000);
    element.all(by.repeater('option in options')).filter(function(element){
        return element.getText().then(function (text) {
            return text.toLowerCase() === 'install';
        });
    }).then(function(el){
        el[0].click();
    });
    browser.sleep(2000);
    element(by.css('.deployment-play')).click();
    browser.sleep(2000);
    element(by.css('#confirmBtn')).click();
    return browser.sleep(300000); // wait for installation to finish. arbitrary value right now rather than true logic.
};


exports.goToDeployment = function( deploymentName ){
    browser.ignoreSynchronization = true; // currently using $timeout which will break protractor
    browser.get('/#/deployment/' + deploymentName + '/topology');
};