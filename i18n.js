/**
 *  Internationalization Package
 *
 */

I18n = {

  lang: "en",

  langPacks: {},
  
  errors: [],
  
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
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  },

  // get the tranlated string for the given key 
  get: function(key, args) {
    var value = "";
    try {
      value = key.split(".").reduce(function(o, i) {return o[i]}, this.langPacks[this.lang]);
      if (args) {  
        value = this.sprintf(value, args);
      }
    } catch (ex) {
      if (! this.errors instanceof Array)
        this.errors = [];
        
      this.errors.push(ex.message);
    }
    
    return value;
  },

  getErrors: function(keep) {
    keep = keep || false;
    
    var errors = this.errors;
    if ( ! keep)
      this.errors = null;
      
    return errors;
  }
};

// for Template 
if (Meteor.isClient){
  UI.registerHelper("i18n", function(key, options){  
    if (options.hash) {
      var map = options.hash;
      var keys = Object.keys(map);
      var args = [];
      for (var i = 0; i < keys.length; i++) {
        args[parseInt(keys[i])] = map[keys[i]];
      }
      return I18n.get(key, args);
    } else {
      return I18n.get(key);
    }
    
  }); 
}
