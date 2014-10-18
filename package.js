Package.describe({
  name: 'leesangwon:mira-i18n',
  summary: 'Internationalization package with moment, moment-timezone ',
  version: '0.5.0',
  git: 'https://github.com/miraten/mira-i18n.git'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.3.1');
  api.addFiles([
    'i18n.js',
    'moment.js',
    'moment-timezone.js'
  ], ['client', 'server']);

  api.use([
    'tracker',
    'underscore'
  ], ['client', 'server']);

  api.use([
    'spacebars',
    'templating'
  ], 'client');

  api.export('I18n');
});

Package.onTest(function(api) {
  api.use([
    'tinytest',
    'leesangwon:mira-i18n'
  ]);

  api.use([
    'spacebars',
    'templating'
  ], 'client');

  api.addFiles([
    "test/i18n-tests.js",
    "test/lang/en.js",
    "test/lang/ko.js",
    "test/lang/en_accounts.js",
    "test/lang/ko_accounts.js",
    "test/lang/ko_moment.js"
  ]);
});
