var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

var language_translator = new LanguageTranslatorV2({
    username: 'd1558450-a339-46a0-95b6-52e96ac3c50e',
    password: 'pD0iJzfAjM2m',
    url: 'https://gateway.watsonplatform.net/language-translator/api/'
});

function Watson() {}

Watson.prototype.traduz = function (item, callback) {

   language_translator.translate({text: item.entrada, source : item.idiomaOrigem, target: item.idiomaSaida}, callback);

   console.log("Callback: " + callback);


}





module.exports = function(){
    return Watson;
}