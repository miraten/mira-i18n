Tinytest.add("I18n - Simple Test", function(test) {
  
  I18n.registerLanguage("en", I18nLanguagePack_en);
  I18n.registerLanguage("ko", I18nLanguagePack_ko, I18nLanguagePackMoment_ko);
  I18n.addPartial("en", "accounts", I18nLanguagePackAccounts_en);
  I18n.addPartial("ko", "accounts", I18nLanguagePackAccounts_ko);

  I18n.addTimeZone("Asia/Seoul|KST KST KST KDT KDT|-8u -90 -80 -90 -a0|0101232014141|-2CsUu Ucnu 9Iou S5Xu eWN0 Mn0 2cp0 hnzu JhXu 11z0 1o10 11z0");

  var value;

  I18n.setLanguage("en");

  value = I18n.get("button.delete");
  test.equal(value, "Delete");

  value = I18n.get("accounts.command.signin");
  test.equal(value, "Sign In");

  value = I18n.get("accounts.command.configureService", ["Facebook"]);
  test.equal(value, "Configure Facebook Login");
  
  value = I18n.get("accounts.test.multiParams", ["Facebook", "Twitter", "Google Plus"]);
  test.equal(value, "The 3 parameters are: Facebook, Twitter, Google Plus");
  
  value = I18n.get("accounts.test.duplParams", ["Facebook", "Twitter"]);
  test.equal(value, "The duplicated parameters are: Facebook, Twitter, Facebook, Twitter");
  
  value = I18n.formatDate(new Date(), 'L');
  test.equal(value, "10/18/2014");

  value = I18n.formatDate(new Date(), 'L', 'Asia/Seoul');
  test.equal(value, "10/18/2014");

  I18n.setLanguage("ko");
  
  value = I18n.get("button.delete");
  test.equal(value, "삭제");

  value = I18n.get("accounts.command.signin");
  test.equal(value, "로그인");

  value = I18n.get("accounts.command.configureService", ["Facebook"]);
  test.equal(value, "Facebook 로그인 설정");

  value = I18n.get("accounts.test.multiParams", ["Facebook", "Twitter", "Google Plus"]);
  test.equal(value, "세 개의 매개변수는 다음과 같다: Facebook, Twitter, Google Plus");

  value = I18n.get("accounts.test.duplParams", ["Facebook", "Twitter"]);
  test.equal(value, "중복된 매개변수는 다음과 같다: Facebook, Twitter, Facebook, Twitter");

  value = I18n.get("test.multiParams", ["Facebook", "Twitter", "Google Plus"]);
  test.equal(value, "");


  var errors = I18n.getErrors(1);
  if (errors)
    test.equal(errors.length, 1);

  errors = I18n.getErrors();
  if (errors)
    test.equal(errors.length, 1);

  errors = I18n.getErrors();
  test.equal(errors, null);

});
