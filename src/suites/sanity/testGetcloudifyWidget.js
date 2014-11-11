/**
 * Created by kinneretzin on 11/11/14.
 */

'use strict';

var components = require('../../components');
var logger = require('log4js').getLogger('testGetcloudifyWidget');
var q= require('q');

describe('layout', function(){

    it('Should have Registration form, button and video', function( done ){

        logger.info('Loading widget page ');
        components.ui.page.loadWidgetPage();
        components.ui.layout.findForm().then(function(value){
            logger.info('found form data? ',value);
            expect(value.hasForm).toBe(true);
            expect(value.hasNameInput).toBe(true);
            expect(value.hasEmailInput).toBe(true);
            expect(value.hasSubmitButton).toBe(true);
            expect(value.hasVideo).toBe(true);

            done();

        }) ;
    }, components.config.timeout );



    it('Loading Widget', function( done ){

        components.ui.page.loadWidgetPage();

        // First expect the value to be 'loading...'
        components.ui.layout.getButtonText().then(function(value){
            logger.info('found button Text "' + value +"'");
            expect(value).toBe('Loading...');
        }) ;

        var tryItNowFound = false

        var checkButtonText = function() {
            components.ui.layout.getButtonText().then(function(value){
                logger.info('found button Text "' + value +"'");
                tryItNowFound = (value.toLowerCase() == 'try it now!');

                if (!tryItNowFound) {
                    setTimeout(checkButtonText,100);
                }
            }) ;
        }

        runs(function() {
            checkButtonText();
        });

        // Wait for the value to change to 'try it now!'
        waitsFor(function() {
            return tryItNowFound;
        }, "The button title should be 'TRY IT NOW!'", components.config.timeout );

        runs(function() {
            expect(tryItNowFound).toBe(true);
            done();
        });

    }, components.config.timeout );

    it('Filling widget Form', function( done ){

        components.ui.page.loadWidgetPage();

        // First expect the value to be 'loading...'
        components.ui.layout.getButtonText().then(function(value){
            logger.info('found button Text "' + value +"'");
            expect(value).toBe('Loading...');
        }) ;

        var tryItNowFound = false

        var checkButtonText = function() {
            components.ui.layout.getButtonText().then(function(value){
                logger.info('found button Text "' + value +"'");
                tryItNowFound = (value.toLowerCase() == 'try it now!');

                if (!tryItNowFound) {
                    setTimeout(checkButtonText,100);
                }
            }) ;
        }

        runs(function() {
            checkButtonText();
        });

        // Wait for the value to change to 'try it now!'
        waitsFor(function() {
            return tryItNowFound;
        }, "The button title should be 'TRY IT NOW!'", components.config.timeout );

        runs(function() {
            expect(tryItNowFound).toBe(true);


            components.ui.layout.fillFormAndSubmit().then(function(){

                components.ui.layout.getButtonText().then(function(value){
                    logger.info('found button Text "' + value +"'");
                    expect(value.toLowerCase()).toBe('loading your machine...');
                });
            });
        });

        // Wait for the widget to start
        var widgetStartFinished = false;

        var checkWarning = function() {
            components.ui.layout.getWarning().then(function(value){
                logger.info('Warning value is: '+value);
                if (value == null || value.toLowerCase() == "we're so hot, that all machines are occupied! please try again in a few minutes.") {
                    logger.info('got error message, which is ok');
                    widgetStartFinished = true;
                }

                if (!widgetStartFinished) {
                    setTimeout(checkWarning,100);
                }
            });

        };

        var checkSucess = function() {
            components.ui.layout.getStartedMachineUrl().then(function(value) {
                logger.info('getStartedMachineUrl value is: ' + value);
                if (value != null) {
                    logger.info('found url : ' + value);
                    widgetStartFinished = true;
                }

                if (!widgetStartFinished) {
                    setTimeout(checkSucess,100);
                }
            });
        };

        runs(function() {
            logger.info('sdfsdfsdf');
            checkWarning();
            checkSucess();
        });

        waitsFor(function() {
            return widgetStartFinished;
        }, "Widget start should either return error or show widget success message + link", components.config.timeout );

        runs(function() {
            expect(widgetStartFinished).toBe(true);
            done();
        });

    }, components.config.timeout );

});
