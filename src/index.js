const Data = require('data-bite');
const {Language, Template} = require('hightech');
// Resolvers
const resolver = {
  latest: require('./resolvers/news/latest')
};

const Announcement = {
    /**
      * Check if skill is compatable with current intent
      */
    canHandle(handlerInput)
    {
        let request = handlerInput.requestEnvelope.request;

        let capable = false;
        switch (request.intent.name) {
            case 'news':
                capable = true;
            break;
        }

        return capable;
    },

    /**
      * Handle input from intent
      */
    handle(handlerInput)
    {
        // TODO: Load from config
        let locale = 'en_GB';
        let locales = ['en_GB', 'ja_JP'];
        let langs = ['eng', 'jpn'];

        return new Promise( (resolve, reject) => {
          let {request} = handlerInput.requestEnvelope;
          let service = new Data().service();
          let pathOptions = {cwd: __dirname};
          let lang = new Language(locale, locales, langs, pathOptions);
          let pod = { // TODO: Implement as full consumable service
            tz: 'Europe/London'
          };

          lang.loadTranslations().then(() => {
            let templater = new Template(pathOptions, lang.gt);
            switch (request.intent.name) {
              /**
                * News
                */
              case 'news': resolve( resolver.latest(service, templater) ); break; // Post
            }
          });
        });
    }
};

module.exports = Announcement;
