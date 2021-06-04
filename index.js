var cool = require("cool-ascii-faces");

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var request = require("request");
var port = (process.env.PORT || 10000);
//var BASE_API_PATH = "/api/v1/";
var app = express();

/*
app.get("/cool", (request,response) => {//request son los datos que me mandan a mi y response es para devolver datos al cliente
	response.send(cool());
	console.log("New request to /cool has arrived");
});
*/
app.use("/", express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
//=========================================== AJMR =========================================================

var nutsAPI =  require("./src/back/nutsAPI/v2");
nutsAPI.register(app);


//=========================================== JMGD =========================================================
var oilAPI1 =  require("./src/back/oilAPI/v1");
oilAPI1.register(app);

var oilAPI =  require("./src/back/oilAPI/v2");
oilAPI.register(app);
//proxyExt
var proxyCoinlore = "https://api.coinlore.net/api/tickers/?start=20&limit=10"
var pathProxyCoinlore = "/proxyCoinlore"
app.use(pathProxyCoinlore, function(req,res){
	console.log("Piped:" + req.baseUrl + req.url);
	req.pipe(request(proxyCoinlore)).pipe(res);
});
//=========================================== AFB =========================================================
var wineAPI =  require("./src/back/wineAPI/v2");
wineAPI.register(app);
//proxyExt1
var proxyCoin = "https://api.coinstats.app/public/v1/coins?"
var pathProxyCoin = "/proxyCoin"
app.use(pathProxyCoin , function(req,res){
	console.log("Piped:" + req.baseUrl + req.url);
	req.pipe(request(proxyCoin)).pipe(res);
});
//proxyExt2
var proxyGive = "https://www.gamerpower.com/api/giveaways"
var pathProxyGive = "/proxyGive"
app.use(pathProxyGive , function(req,res){
	console.log("Piped:" + req.baseUrl + req.url);
	req.pipe(request(proxyGive)).pipe(res);
});
// =======================================Codigo de grupo===========================
app.listen(port, () => {//la segunda parte del listen se ejecuta cuando el servidor esta listo
	console.log("Server ready. Listening on port " + port);
});