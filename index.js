
const { table } = require("console");
var cool = require("cool-ascii-faces");
var express = require("express");
var path = require("path");
var app = express();
var port = (process.env.PORT || 10000);

/*
app.get("/cool", (request,response) => {//request son los datos que me mandan a mi y response es para devolver datos al cliente
	response.send(cool());
	console.log("New request to /cool has arrived");
});
*/
app.use("/", express.static(path.join(__dirname,"public")));

//AJMR
app.get("/info/nuts-production-stats", (request,response) => {
	response.send("<html><body><h1>En esta tabla se muestran los datos de la producción de almendras, nueces y pistachos en los diferentes países que más rendimiento sacan de ello</h1><table border><tr><th>country</th><th>year</th><th>almonds-prods</th><th>walnut-prods</th><th>pistachio-prods</th></tr><tr><th>Spain</th><th>2011</th><th>208800</th><th>13815</th><th>2708</th></tr><tr><th>Italy</th><th>2011</th><th>104790</th><th>10500</th><th>3079</th></tr><tr><th>Greece</th><th>2011</th><th>29800</th><th>29800</th><th>7791</th></tr><tr><th>Turkey</th><th>2011</th><th>69838</th><th>203212</th><th>112000</th></tr><tr><th>USA</th><th>2011</th><th>1655000</th><th>418212</th><th>201395</th></tr></table></body></html>");
	console.log("New request to /info/nuts-production-stats has arrived");
});

app.listen(port, () => {//la segunda parte del listen se ejecuta cuando el servidor esta listo
	console.log("Server ready. Listening on port " + port);
});