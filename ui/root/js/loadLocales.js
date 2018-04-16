var init_i18n = function(language, resourceStore) {
   i18n.init({
      lng: language,
      fallbackLng: 'en',
      ns: "stonehearth",
      resStore: resourceStore,
      resGetPath: '../../../[str(ns)]/locales/[str(lng)].json',
      reusePrefix: 'i18n(',
      parseMissingKey: function(missingKey) {
         if (_debug_show_untranslated) {
            return "***"+missingKey+"***";
         }
         return missingKey;
      },
      maxRecursion: 8,
   },
   function() {
      if (App) {
         // Tell the app to load locales if the app has loaded modules.
         // Unfortunately this has to be done because sometimes the app's
         // modules loads before i18n, and sometimes i18n loads before app
         // modules. :(
         App.tryLoadLocales();
      }
   });
}


$.getJSON('/stonehearth/locales/supported_languages.json', function(data) {
   var supportedLanguages = data.languages;
   radiant.call('radiant:get_config', 'language')
   .done(function(o) {
      // Grab the default language from our configuration settings.
      var language = o.language;
      if (!language || !(language in supportedLanguages)) {
         language = 'en'
      }

      init_i18n(language);

      // var languageData = supportedLanguages[language];
      // var files = [];

      // if (languageData.path) {
      //    files = [languageData.path];
      // }

      // if (languageData.paths) {
      //    files = languageData.paths;
      // }

      // var translate_data = {};
      // var count = 0;
      
      // for (var i = 0; i < files.length; i++) {

      //    $.getJSON(files[i], function(data) {
      //       $.extend(true, translate_data, data);
      //       count++;

      //       if (files.length == count) {
      //          i18n.addResourceBundle(language, 'stonehearth', translate_data);
      //       }
      //    })
      // };

   });
});
