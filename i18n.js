/**
 *  Internationalization Package
 *
 */

// Tracker for fromNow
var fromNowTracker = new Tracker.Dependency;
var fromNowHeartBit = 1000 * 60;

var formatDateFromNow = function(time) {
  fromNowTracker.depend();
  return moment(time).fromNow();
};

Meteor.setInterval(function() { fromNowTracker.changed(); }, fromNowHeartBit);

// Tracker for language
var languageTracker = new Tracker.Dependency;

I18n = {

  lang: "en",

  langPacks: {},
  
  errors: [],
  
  // register the language pack
  registerLanguage: function(lang, map, time_map) {
    this.langPacks[lang] = map;  
    if (lang != 'en')
      moment.locale(lang, time_map);
    languageTracker.changed();
  },
  
  // add partial language pack to the main pack
  addPartial: function(lang, key, map) {
    this.langPacks[lang][key] = map;
    languageTracker.changed();
  },

  getLanguage: function() {
    languageTracker.depend();
    return this.lang;
  },
  
  // set active language
  setLanguage: function(lang) {
    this.lang = lang;
    moment.locale(lang);
    languageTracker.changed();
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

      if (this.errors)
        this.errors.push(ex.message);
    }
    
    languageTracker.depend();
    return (value) ? value : key;
  },

  formatDate: function(time, format) {
    format = format || 'YYYY MM DD hh:mm:ss';
    if (format === 'relative')
      return formatDateFromNow(time);
    else
      return moment(time).format(format);
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
  Template.registerHelper("i18n", function(key, options){
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

  Template.registerHelper('formatDate', function(param) {
    if (typeof param === 'number') {
      return I18n.formatDate(param);
    } else if (typeof param === 'object') {
      return I18n.formatDate(param.hash.value, param.hash.format);
    } else {
      return '';
    }
  });
}
