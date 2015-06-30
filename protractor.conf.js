
exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Spec patterns are relative to the location of this config.
    specs: [
        'spec/**/*_spec.js'
    ],

    //https://github.com/angular/protractor/blob/master/docs/referenceConf.js
    //http://stackoverflow.com/questions/28040078/no-injector-found-for-element-argument-to-gettestability
    rootElement: '[ng-app]',

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {'args': ['--disable-extensions']}
    },


    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    // in automated test use export PROTRACTOR
    baseUrl: process.env.PROTRACTOR_BASE_URL || 'http://localhost:4000',

    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: false,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 600000 // 10 minutes because deploy + install takes a long time
    }
};