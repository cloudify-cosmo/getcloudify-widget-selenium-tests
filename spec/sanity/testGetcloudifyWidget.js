/**
 * Created by kinneretzin on 11/11/14.
 */

'use strict';

var components = require('../../src/components');
var logger = require('log4js').getLogger('testGetcloudifyWidget');


describe('widget page', function(){

    it('should give cloudify-ui on form submit', function( done ) {
        if ( components.config.skipDeploy ) {
            browser.ignoreSynchronization = true;
        }

        var cloudifyIp = components.config.cloudifyIp;

        if ( !components.config.skipDeploy ) {

            if (!components.config.skipPage) {
                logger.info('Loading widget page ');
                components.ui.page.loadWidgetPage(cloudifyIp);
                components.ui.page.fillForm('automated test', 'automatedtest@getcloudify.org');
                components.ui.page.submit().then(function () {
                    logger.info('submitted');
                });
                components.ui.page.getIp().then(function (ip) {
                    cloudifyIp = ip;
                });
            }

            browser.sleep(1).then(function () {
                logger.info('skipping page');
                browser.baseUrl = 'http://' + cloudifyIp;
                browser.get('/');
            });

            var deploymentName = components.config.deploymentName;

            if (!components.config.skipDeployBlueprint) {
                deploymentName = deploymentName || 'automated-test-dep-' + new Date().getTime();
                components.ui.cloudify.loadBlueprints();
                components.ui.cloudify.deployBlueprint(deploymentName);
            } else {
                deploymentName = deploymentName || 'automated-test-dep';
                components.ui.cloudify.goToDeployment(deploymentName);
            }
            components.ui.cloudify.installDeployment({waitExecutionEnd: true});
        }

        browser.sleep(1).then(function(){
            browser.ignoreSynchronization = true;
            browser.baseUrl = 'http://' + cloudifyIp + ':8080';
            browser.get('/');
        });

        browser.sleep(15000); // the time it takes nodecellar to load

        element(by.css('body')).getText().then(function(text){
            console.log('this is text',text);
            expect(text.indexOf('Welcome to Node Cellar') >= 0).toBe(true);
        });

        browser.sleep(1000).then(done);

    });

});
