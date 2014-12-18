var config = {};

config.seleniumAddress = 'http://localhost:4444/wd/hub';

config.multiCapabilities = [
  // {
  //   'browserName': 'firefox'
  // },
  {
    'browserName': 'chrome'
  }
];

config.suites = {
  homepage: 'test/e2e/homepage/**/*.spec.js',
  notes: 'test/e2e/notes/**/*.spec.js',
  authentication: 'test/e2e/authentication/**/*.spec.js'
};

config.jasmineNodeOpts = {
  isVerbose: true,
  showColors: true,
  defaultTimeoutInterval: 30000
};

config.baseUrl = 'http://localhost:9001';

exports.config = config;
