Package.describe({
  summary: "Internationalization"
});

Package.on_use(function (api, where) {
	api.use(["ui"], "client");
  api.add_files(["i18n.js"], ["client", "server"]);
	api.export("I18n");
});

Package.on_test(function (api) {
  api.use(["mira-i18n", "tinytest", "test-helpers"]);
  
  api.add_files([
    "test/i18n-test.js",
    "test/lang/en.js",
    "test/lang/ko.js",
    "test/lang/en_accounts.js",
    "test/lang/ko_accounts.js",
    ]);
});
