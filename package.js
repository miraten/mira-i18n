Package.describe({
  summary: "Internationalization for text and time"
});

Package.on_use(function(api, where) {
  api.use("deps");
	api.use(["ui"], "client");
  api.add_files(["i18n.js"], ["client", "server"]);
  api.add_files(["moment.js"], ["client", "server"]);
  api.add_files(["moment-timezone.js"], ["client", "server"]);
	api.export("I18n");
});

Package.on_test(function(api) {
  api.use(["deps", "mira-i18n", "tinytest", "test-helpers"], ["client", "server"]);
  
  api.add_files([
    "test/i18n-test.js",
    "test/lang/en.js",
    "test/lang/ko.js",
    "test/lang/en_accounts.js",
    "test/lang/ko_accounts.js",
    "test/lang/ko_moment.js"
    ]);
});
