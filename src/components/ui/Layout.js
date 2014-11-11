'use strict';

var q= require('q');
var driver = require('../driver');
var logger = require('log4js').getLogger('Layout');
var css = require('selenium-webdriver').By.css;


/**
 *
 * @returns promise - function( href value )
 */


exports.findSubmitbutton = function() {
    var deferred = q.defer();

    driver.get().findElement(css('form .row input[type=submit]')).then(function(element){
        logger.info('got button element');
        deferred.resolve(element != null);
    });

    return deferred.promise;

}


exports.findForm = function() {
    var deferred = q.defer();

    var drv = driver.get();

    drv.findElement(css('form[name=tryNowForm]')).then(function(element){
        logger.info('got form element',element);
        var data = {
            hasForm: element != null
        }

        if (element != null) {
            data.hasNameInput = drv.findElement(css('form[name=tryNowForm] input[name=nameInput]')) != null;
            data.hasEmailInput = drv.findElement(css('form[name=tryNowForm] input[name=emailInput]')) != null;
            data.hasEmailInput = drv.findElement(css('form[name=tryNowForm] input[name=emailInput]')) != null;
            data.hasSubmitButton = drv.findElement(css('form[name=tryNowForm] #tryNowBtn')) != null;
            data.hasVideo = drv.findElement(css('.videoContainer')) != null;
        }

        deferred.resolve(data);
    });

    return deferred.promise;

}


exports.getButtonText = function() {
    var deferred = q.defer();

    driver.get().findElement(css('form[name=tryNowForm] #tryNowBtn')).then(function(element){
        deferred.resolve(element.getAttribute("innerHTML"));
    });

    return deferred.promise;

}

exports.fillFormAndSubmit = function() {
    var deferred = q.defer();

    var drv = driver.get();

    drv.findElement(css('form[name=tryNowForm] input[name=nameInput]')).then(function(element){
       element.sendKeys('test');

        drv.findElement(css('form[name=tryNowForm] input[name=emailInput]')).then(function(element){
            element.sendKeys('test@email.com');

            drv.findElement(css('form[name=tryNowForm] #tryNowBtn')).then(function(element){
                element.click();
                deferred. resolve('clicked');
            });
        });
    });


    return deferred.promise;
}

exports.getWarning = function(){

    var deferred = q.defer();

    driver.get().findElement(css('.text-warning')).then(function(element){
        element.getCssValue('display').then(function(value) {
            if (value == 'none') {
                deferred.resolve(null);
            } else {
                deferred.resolve(element.getAttribute("innerHTML"));
            }
        });
    });

    return deferred.promise;
}

exports.getStartedMachineUrl = function(){

    var deferred = q.defer();

    driver.get().findElement(css('.well.text-success')).then(function(element){
        element.getCssValue('display').then(function(value){
            if (value == 'none') {
                deferred.resolve(null);
            } else {
                driver.get().findElement(css('.well.text-success a')).then(function(element) {
                    deferred.resolve(element.getAttribute("innerHTML"));
                });
            }

        });
    });

    return deferred.promise;
}


