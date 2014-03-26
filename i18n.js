/**
 *  Internationalization Package
 *
 *  먼저 loadLocale 메서드를 사용하여 언어팩을 등록한다. 복수의 언어팩을 등록할 수 있다.
 *  그리고, setLocale 메서드로 언어를 지정한다.
 *  이 과정은 일반적으로 '/client/main.js' 파일에서 수행하면 된다.
 *
 *  사용방법은 간단하다. 
 *  템플릿에서 {{i18n 'key'}} 방식으로 사용한다.
 *
 */

I18n = {

  lang: "en",

  langPacks: {},
  
  // register the language pack
  registerLanguage: function(lang, map) {
    this.langPacks[lang] = map;  
  },
  
  // add partial language pack to the main pack
  addPartial: function(lang, key, map) {
    this.langPacks[lang][key] = map;
  },
  
  // set active language
  setLanguage: function(lang) {
    this.lang = lang;
  },
  
  // return the formatted string with the parameters
  sprintf: function(format, args) {
    return format.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number] 
        : match
      ;
    });
  },

  // return the string for the given key 
  value: function(key, args) {
    var value;
    try {
      value = key.split(".").reduce(function(o, i) {return o[i]}, this.langPacks[this.lang]);
      if (args && args.length > 0) {
        value = this.sprintf(value, args);
      }
    } catch (ex) {
      console.log("fail to the value for the key = '" + key + "' : " + ex.message);  
    }
    
    return value;
  }

};

// for Template 
if (Meteor.isClient){
  Handlebars.registerHelper("i18n", function(key, options){
    var map = options.hash;
    var keys = Object.keys(map);
    var args = [];
    for (var i = 0; i < keys.length; i++) {
      args[parseInt(keys[i])] = map[keys];
    }
    
    return I18n.value(key, args, options.hash);
  }); 
}
