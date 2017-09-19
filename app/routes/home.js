module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('home/index', {info : {}});
    }); //app.get ('/')

    app.post('/', function (req, res) {

        var item = req.body;
        var preTraducao;

        var idiomaSaida = item.idiomaSaida;
        var entrada = item.entrada;
        var idiomaOrigem= item.idiomaOrigem;

        if(item.idiomaOrigem != "en" && item.idiomaSaida != "en"){

            var watsonFiltro = new app.infra.Watson();

            var subItem = item;

            subItem.idiomaSaida = "en";

            watsonFiltro.traduz(subItem, function (err, results) {

                if (!err) {

                    preTraducao = results.translations[0].translation;

                    item.entrada = preTraducao;
                    item.idiomaOrigem = "en";
                    item.idiomaSaida = idiomaSaida;

                    watsonFiltro.traduz(item, function (err, results) {

                        if(!err){
                            var teste = results.translations[0].translation;

                            item.entrada = entrada;
                            item.idiomaOrigem = idiomaOrigem;
                            item.saida = teste;
                            item.erro = null;

                            res.render('home/index', {info : item});
                            return;
                        }

                        console.log("Erro traducao: " + err);
                        item.saida = "";
                        item.entrada = "";
                        item.erro = "Não foi possivel realizar a tradução";

                        res.render('home/index', {info : item});

                    });
                }
            });
        }else{

            var watson = new app.infra.Watson();

            watson.traduz(item, function (err, results) {

                if(!err){
                    var retorno = results.translations[0].translation;

                    item.saida = retorno;
                    item.erro = null;

                    res.render('home/index', {info : item});
                    return;
                }

                console.log("Erro traducao: " + err);
                item.saida = "";
                item.entrada = "";
                item.erro = "Não foi possivel realizar a tradução";

                res.render('home/index', {info : item});

            });

        }

    });
}