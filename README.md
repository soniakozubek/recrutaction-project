#
# Automated tests for Egnyte recrutation application


## Prerequisites

- Node.js
- npm package manager (should be installed with node.js)
- Protractor
- Selenium webdriver
- Chrome (version 69)

## Test environment setup

First step is to download project from GitHub repository and unpack it in desired location.

If you do not have node.js environment installed on your computer, go to [https://nodejs.org/](https://nodejs.org/) page and download installer compatible with your operating system. Run downloaded file and go through installation process. .

Use npm package manager to install test tool Protractor globally. Run command in command line:

````
 npm install -g protractor
````

This command will install tools: protractor and webdriver-manager.

The webdriver-manager tool supports running an instance of a Selenium Server.

Make it ready to use:
````
webdriver-manager update
````
Now start up a Selenium Server instance:
````
webdriver-manager start
````
After successful start of the Selenium Server, in the console should be visible message:  Selenium Server is up and running on port 4444.

Tests will be executed on browser: Google Chrome 
If you do not have Google Chrome installed:

- Google Chrome: [https://www.google.com/chrome/](https://www.google.com/chrome/)

## Running the tests

To execute tests, open new command line window and run commands:
````
1. cd –-_absolute__path to your project folder--_
2. Protractor conf.js
````
