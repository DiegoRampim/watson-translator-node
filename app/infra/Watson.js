

var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

var language_translator = new LanguageTranslatorV2({
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
    url: 'https://gateway.watsonplatform.net/language-translator/api/'
});

function Watson() {}

Watson.prototype.traduz = function (item, callback) {

    language_translator.translate({text: item.entrada, source : item.idiomaOrigem, target: item.idiomaSaida}, callback);

}

module.exports = function(){
    return Watson;
}

