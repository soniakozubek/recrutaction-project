exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['tests.spec.js'],
    Capabilities: 
      {'browserName': 'chrome'},
    onPrepare: function () {
      browser.manage().window().maximize();
    }
  }; 