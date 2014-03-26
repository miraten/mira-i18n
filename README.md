mira-i18n
=========

Internationalization Package for Meteor JS

Motivation
----------

I inspired by the i18n package in [Telescope](https://github.com/SachaG/Telescope).

It is simple. I loved the simplicity.


However, it didn't satify me. 

First, it has a default language which I do not want.

Second, I want a hierachy structure, not serial structure.

Third, I also want modular structure.


So I made it from the scratch.


Features
--------

Main features are:
 - It is simple too.
 - It is tree structured.
 - It support simple format string.
 - It support modular files.

How to use
----------
 1. Install this package to your project
 
 `mrt add mira-i18n`
 
 2. Write your own language pack.
 Refer to the sample in the source: `/test/lang/en.js`
 Put the language pack file in the directory `/lib` or `/lib/lang`.
 
 3. Write the initialization code.
 It should be loaded later than the package, so '/client/main.js' is good position.
 
 `I18n.registerLanguage('ko', I18nLanguagePack_ko)`
 `I18n.setLanugage('ko');
 
 where `I18nLanguagePack_ko` is the Object name declared in your language pack.

 4. Call the helper in your Template as follows:
 
 `<template name="post">`
 `<label>{{i18n "accounts.user.profile.name"}}</label>`
 `<p>{{i18n "error.invalid" 0=key 1=value}}</p>`
 `</template>`
 
 
 
