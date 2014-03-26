Tinytest.add("I18n - Simple Test", function(test) {
  
  I18n.registerLanguage("en", I18nLanguagePack_en);
  I18n.registerLanguage("ko", I18nLanguagePack_ko);
  I18n.addPartial("en", "accounts", I18nLanguagePackAccounts_en);
  I18n.addPartial("ko", "accounts", I18nLanguagePackAccounts_ko);
  
  var value;

  I18n.setLanguage("en");

  value = I18n.value("button.delete");
  test.equal(value, "Delete");

  value = I18n.value("accounts.command.signin");
  test.equal(value, "Sign In");

  value = I18n.value("accounts.command.configureService", ["Facebook"]);
  test.equal(value, "Configure Facebook Login");
  
  I18n.setLanguage("ko");
  
  value = I18n.value("button.delete");
  test.equal(value, "삭제");

  value = I18n.value("accounts.command.signin");
  test.equal(value, "로그인");

  value = I18n.value("accounts.command.configureService", ["Facebook"]);
  test.equal(value, "Facebook 로그인 설정");
  
});
