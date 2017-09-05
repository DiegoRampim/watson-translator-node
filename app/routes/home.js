module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('home/index', {info : {}});
    }); //app.get ('/')

    app.post('/', function (req, res) {

        var item = req.body;

        console.log(item);

        var watson = new app.infra.Watson();

        watson.traduz(item, function (err, results) {

            var teste = JSON.stringify(results.translations[0].translation);

            console.log("translations: " + teste);

            item.saida = teste;

            console.log("ITEM: " + JSON.stringify(item));

            res.render('home/index', {info : item});

        });

    });


}