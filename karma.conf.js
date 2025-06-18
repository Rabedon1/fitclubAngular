module.exports = function (config) {
  config.set({
    // ... otras configuraciones ...
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      subdir: '.'
    }
  });
};
