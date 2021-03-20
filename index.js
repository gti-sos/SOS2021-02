
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

//JMGD
app.get("/info/oil-production-stats", (request,response) => {
	response.send("<html><body><h1>En esta tabla se muestra la producción, distribución y exportación de aceite en distintos paises del mundo</h1><table border><tr><th>country</th><th>year</th><th>production</th><th>exportation</th><th>distribution</th></tr><tr><th>Spain</th><th>2011</th><th>669,1</th><th>48,36</th><th>18,61</th></tr><tr><th>Italy</th><th>2011</th><th>735</th><th>28,74</th><th>22,12</th></tr><tr><th>Greece</th><th>2011</th><th>420</th><th>5,48</th><th>7,71</th></tr><tr><th>Turkey</th><th>2011</th><th>160</th><th>1.26</th><th>3.85</th></tr><tr><th>USA</th><th>2011</th><th>3</th><th>0.38</th><th>9.22</th></tr></table></body></html>");
	console.log("New request to /info/oil-production-stats has arrived");
});

//AFB
app.get("/info/nuts-production-stats", (request,response) => {
	response.send("<html><body><h1>En esta tabla se muestran los datos de la producción de almendras, nueces y pistachos en los diferentes países que más rendimiento sacan de ello</h1><table border><tr><th>country</th><th>year</th><th>almonds-prods</th><th>walnut-prods</th><th>pistachio-prods</th></tr><tr><th>Spain</th><th>2011</th><th>208800</th><th>13815</th><th>2708</th></tr><tr><th>Italy</th><th>2011</th><th>104790</th><th>10500</th><th>3079</th></tr><tr><th>Greece</th><th>2011</th><th>29800</th><th>29800</th><th>7791</th></tr><tr><th>Turkey</th><th>2011</th><th>69838</th><th>203212</th><th>112000</th></tr><tr><th>USA</th><th>2011</th><th>1655000</th><th>418212</th><th>201395</th></tr></table></body></html>");
	console.log("New request to /info/nuts-production-stats has arrived");
});

app.listen(port, () => {//la segunda parte del listen se ejecuta cuando el servidor esta listo
	console.log("Server ready. Listening on port " + port);
});

