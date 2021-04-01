var cool = require("cool-ascii-faces");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var port = (process.env.PORT || 10000);
var BASE_API_PATH = "/api/v1/";


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
var nutsstats = [
    {
        "country": "Spain",
        "year": 2011,
		"almond-prod": 208800,
		"walnut-prod": 13815,
		"pistachio-prod": 2708
    },
	{
        "country": "Italy",
        "year": 2011,
		"almond-prod": 104790,
		"walnut-prod": 10500,
		"pistachio-prod": 3079
    },
	{
		"country": "Greece",
        "year": 2011,
		"almond-prod": 29800,
		"walnut-prod": 29800,
		"pistachio-prod": 7791
    },
	{
		"country": "Turkey",
        "year": 2011,
		"almond-prod": 69838,
		"walnut-prod": 203212,
		"pistachio-prod": 112000
    },
	{
        "country": "USA",
        "year": 2011,
		"almond-prod": 1655000,
		"walnut-prod": 418212,
		"pistachio-prod": 201395
    }
];

//Get al info (tabla)
app.get("/info/nuts-production-stats", (request,response) => {
	response.send("<html><body><h1>En esta tabla se muestran los datos de la producción de almendras, nueces y pistachos en los diferentes países que más rendimiento sacan de ello</h1><table border><tr><th>country</th><th>year</th><th>almond-prod</th><th>walnut-prod</th><th>pistachio-prod</th></tr><tr><th>Spain</th><th>2011</th><th>208800</th><th>13815</th><th>2708</th></tr><tr><th>Italy</th><th>2011</th><th>104790</th><th>10500</th><th>3079</th></tr><tr><th>Greece</th><th>2011</th><th>29800</th><th>29800</th><th>7791</th></tr><tr><th>Turkey</th><th>2011</th><th>69838</th><th>203212</th><th>112000</th></tr><tr><th>USA</th><th>2011</th><th>1655000</th><th>418212</th><th>201395</th></tr></table></body></html>");
	console.log("New request to /info/nuts-production-stats has arrived");
});

//GET loadInitialData
app.get(BASE_API_PATH+"nuts-production-stats/loadInitialData", (req, res) =>{
    res.send(JSON.stringify(nutsstats, null, 2));
	
});

//GET a toda la lista de recursos
app.get(BASE_API_PATH+"nuts-production-stats", (req, res) =>{
    res.send(JSON.stringify(nutsstats, null, 2));
});

//GET a un recurso
app.get(BASE_API_PATH+"nuts-production-stats/:country/:year", (req, res) =>{
	var reqcountry = req.params.country;
	var reqyear = req.params.year;
	var sendData = [];
	for(var i=0; i<nutsstats.length-1; i++) {
		if((String(nutsstats[i].country) === reqcountry) && (nutsstats[i].year === parseInt(reqyear))){
			sendData.push(nutsstats[i]);
		}
    	res.send(JSON.stringify(sendData, null, 2));
	}
});

//POST para crear un nuevo recurso en nuestra lista
app.post(BASE_API_PATH+"nuts-production-stats", (req, res) =>{
    var newCountry = req.body;
    console.log(`new country to be added:	<${JSON.stringify(newCountry,null,2)}>`);
	nutsstats.push(newCountry);
	res.sendStatus(201);
});

//=========================================== JMGD =========================================================
var oilstats = [
    {
        "country": "Spain",
        "year": 2011,
		"production": 669.1,
		"exportation": 48.36,
		"distribution": 18.61
    },
	{
        "country": "Italy",
        "year": 2011,
		"production": 735,
		"exportation": 28.74,
		"distribution": 22.12
    },
	{
        "country": "Grece",
        "year": 2011,
		"production": 420,
		"exportation": 5.48,
		"distribution": 7.71
    },
	{
        "country": "Turkey",
        "year": 2011,
		"production": 160,
		"exportation": 1.26,
		"distribution": 3.85
    },
	{
        "country": "USA",
        "year": 2011,
		"production": 3,
		"exportation": 0.38,
		"distribution": 9.22
    }
];
//GET loadInitialData
app.get(BASE_API_PATH+"oil-production-stats/loadInitialData", (req, res) =>{
    res.send(JSON.stringify(oilstats, null, 2));
	
});
//GET a toda la lista de recursos
app.get(BASE_API_PATH+"oil-production-stats", (req, res) =>{
    res.send(JSON.stringify(oilstats, null, 2));
});
//GET a un recurso
app.get(BASE_API_PATH+"oil-production-stats/({country})", (req, res) =>{
    res.send(JSON.stringify(oilstats, null, 2));
});
//POST para crear un nuevo recurso en nuestra lista
app.post(BASE_API_PATH+"oil-production-stats", (req, res) =>{
    var newCountry = req.params;
    console.log(`new country to be added:	<${JSON.stringify(newCountry,null,2)}>`);
	oilstats.push(newCountry);
	res.sendStatus(201);
});






app.get("/info/oil-production-stats", (request,response) => {
	response.send("<html><body><h1>En esta tabla se muestra la producción, distribución y exportación de aceite en distintos paises del mundo</h1><table border><tr><th>country</th><th>year</th><th>production</th><th>exportation</th><th>distribution</th></tr><tr><th>Spain</th><th>2011</th><th>669,1</th><th>48,36</th><th>18,61</th></tr><tr><th>Italy</th><th>2011</th><th>735</th><th>28,74</th><th>22,12</th></tr><tr><th>Greece</th><th>2011</th><th>420</th><th>5,48</th><th>7,71</th></tr><tr><th>Turkey</th><th>2011</th><th>160</th><th>1.26</th><th>3.85</th></tr><tr><th>USA</th><th>2011</th><th>3</th><th>0.38</th><th>9.22</th></tr></table></body></html>");
	console.log("New request to /info/oil-production-stats has arrived");
});



//=========================================== AFB =========================================================
app.get("/info/wine-production-stats", (request,response) => {
	response.send("<html><body><h1>Producción de vino a nivel mundial</h1><table border><tr><th>country</th><th>year</th><th>productions-wine</th><th>wine-imports</th><th>wine-exports</th></tr><tr><th>Spain</th><th>2011</th><th>33397</th><th>703</th><th>22430</th></tr><tr><th>Italy</th><th>2011</th><th>42772</th><th>2412</th><th>23238</th></tr><tr><th>Greece</th><th>2011</th><th>9132</th><th>203</th><th>376</th></tr><tr><th>Turkey</th><th>2011</th><th>596</th><th>80</th><th>25</th></tr><tr><th>USA</th><th>2011</th><th>19187</th><th>10155</th><th>4210</th></tr></table></body></html>");
	console.log("New request to /info/wine-production-stats has arrived");
});

app.listen(port, () => {//la segunda parte del listen se ejecuta cuando el servidor esta listo
	console.log("Server ready. Listening on port " + port);
});

