mira-i18n
=========

Internationalization Package supporting string and time for Meteor JS

It is inspired by the i18n package in [Telescope](https://github.com/SachaG/Telescope).


Features
--------

Main features are:
 - It is simple.
 - It is hierachy structured.
 - It support simple format string.
 - It uses [moment.js](http://momentjs.com)
 - It support modular files.

How to use
----------
#### Pre-requisite
It uses [moment.js](http://momentjs.com/).

`meteor add leesangwon:moment`

#### Install this package to your project

`meteor add leesangwon:mira-i18n`
 
#### Write your own language pack.
 
Refer to the sample in the source: `/test/lang/en.js`
 
Put the language pack file in the directory `/lib` or `/lib/lang`.
 
#### Write the initialization code.
 
It should be loaded later than the package, so `/client/main.js` is good position.
 
```javascript
I18n.registerLanguage('ko', I18nLanguagePack_ko);
I18n.setLanugage('ko');
```
 
where `I18nLanguagePack_ko` is the Object name declared in your language pack.

#### Call the helper in your Template as follows:
 
```html
<template name="post">
  <label>{{i18n "accounts.user.profile.name"}}</label>
  <p>{{i18n "error.invalid" 0=key 1=value}}</p>
</template>
```

where there should be defined in the language pack as follows:

```javascript
I18nLanguagePack_ko = {
  accounts: {
    user: {
      profile: {
        name: "John Smith"
      }
    }
  }
  
  error: {
    invalid: "Invalid input for key: {0} and value: {1}"
  }
};
```

and key, value should be the data in the data context or helper variables.

#### Modular Pack
If you want to separate the language pack into multiple files, especially useful in packages, I think,
It will give you the solution.

First, separate the pack into multiple file. Refer to the samples in the source `/test/lang/en_accounts.js`.

Second, call `I18n.addPartial(...)` when needed. Refer to the `/test/i18n-test.js` in the source.

Done. That's all.





