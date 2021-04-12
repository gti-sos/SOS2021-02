var BASE_NUTS_API_PATH = "/api/v1/";

var nutsstats = [];
//prueba push
module.exports.register = (app) => {

    //Get al info (tabla)
    app.get("/info/nuts-production-stats", (request,response) => {
        response.send("<html><body><h1>En esta tabla se muestran los datos de la producción de almendras, nueces y pistachos en los diferentes países que más rendimiento sacan de ello</h1><table border><tr><th>country</th><th>year</th><th>almond-prod</th><th>walnut-prod</th><th>pistachio-prod</th></tr><tr><th>Spain</th><th>2011</th><th>208800</th><th>13815</th><th>2708</th></tr><tr><th>Italy</th><th>2011</th><th>104790</th><th>10500</th><th>3079</th></tr><tr><th>Greece</th><th>2011</th><th>29800</th><th>29800</th><th>7791</th></tr><tr><th>Turkey</th><th>2011</th><th>69838</th><th>203212</th><th>112000</th></tr><tr><th>USA</th><th>2011</th><th>1655000</th><th>418212</th><th>201395</th></tr></table></body></html>");
        console.log("New request to /info/nuts-production-stats has arrived");
    });

    //GET loadInitialData
    app.get(BASE_NUTS_API_PATH+"nuts-production-stats/loadInitialData", (req, res) =>{
        
        console.log("NEW GET .../nuts-production-stats/loadInitialData");

        var nutsstatsInitial = [
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

        if(nutsstats.length>0){
            for(var j=0;j<nutsstats.length;j++){
                nutsstats.splice(j);
            }
        }
        for(var i=0;i<nutsstatsInitial.length;i++){
            nutsstats.push(nutsstatsInitial[i]);
        }
        res.send(JSON.stringify(nutsstats, null, 2));
    });

    //GET a toda la lista de recursos
    app.get(BASE_NUTS_API_PATH+"nuts-production-stats", (req, res) =>{
        console.log("NEW GET .../nuts-production-stats");
        res.send(JSON.stringify(nutsstats, null, 2));
    });

    //GET a un recurso
    app.get(BASE_NUTS_API_PATH+"nuts-production-stats/:country/:year", (req, res) =>{
        console.log("NEW GET .../nuts-production-stats/country/year");
        var reqcountry = req.params.country;
        var reqyear = req.params.year;
        var sendData = [];
        for(var i=0; i<nutsstats.length; i++) {
            if((String(nutsstats[i].country) === reqcountry) && (nutsstats[i].year === parseInt(reqyear))){
                sendData.push(nutsstats[i]);
            }
        }
        res.send(JSON.stringify(sendData, null, 2));
    });

    //POST para crear un nuevo recurso en nuestra lista
    app.post(BASE_NUTS_API_PATH+"nuts-production-stats", (req, res) =>{
        var newCountry = req.body;
        console.log(`NEW POST ... country to be added:	<${JSON.stringify(newCountry,null,2)}>`);
        nutsstats.push(newCountry);
        res.sendStatus(201);
    });

    //DELETE a /country/year
    app.delete(BASE_NUTS_API_PATH+"nuts-production-stats/:country/:year", (req,res)=>{
        console.log("NEW DELETE ...../nuts-production-stats/country/year");
        var reqcountry = req.params.country;
        var reqyear = parseInt(req.params.year);
        var found = nutsstats.find(e => (e.country === reqcountry) && (e.year === reqyear));
        if(!found){
            console.log("DATA NOT FOUND");
            res.sendStatus(404);
        }else{
            for(var i=0; i<nutsstats.length; i++) {
                if((String(nutsstats[i].country) === reqcountry) && (nutsstats[i].year === reqyear)){
                    nutsstats.splice(i,1);
                    console.log("DATA REMOVED");
                    res.sendStatus(200);
                }
            }
        }
    });

    // PUT a country/year
    app.put(BASE_NUTS_API_PATH +"nuts-production-stats/:country/:year",(req,res)=>{
        console.log("NEW PUT ...../nuts-production-stats/country/year");
        var reqcountry=req.params.country;
        var reqyear=parseInt(req.params.year);
        var data=req.body;
        
        if(reqcountry!=data.country||reqyear!=data.year){
            res.sendStatus(400).send("BAD Request");
        }else{
            for(var i=0;i<nutsstats.length ;i++){
                if((String(nutsstats[i].country) === reqcountry) && (nutsstats[i].year === reqyear)){
                    nutsstats[i] = data;
                    res.sendStatus(200).send("DATA UPDATED");
                }
            }
        }
    });

    // POST a country/year error
    app.post(BASE_NUTS_API_PATH+"nuts-production-stats/:country", (req,res)=>{
        console.log("NEW POST ...../nuts-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_NUTS_API_PATH+"nuts-production-stats/:year", (req,res)=>{
        console.log("NEW POST ...../nuts-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_NUTS_API_PATH+"nuts-production-stats/:production", (req,res)=>{
        console.log("NEW POST ...../nuts-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_NUTS_API_PATH+"nuts-production-stats/:exportation", (req,res)=>{
        console.log("NEW POST ...../nuts-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_NUTS_API_PATH+"nuts-production-stats/:distribution", (req,res)=>{
        console.log("NEW POST ...../nuts-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_NUTS_API_PATH+"nuts-production-stats/:country/:year", (req,res)=>{
        console.log("NEW POST ...../nuts-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    });

    //PUT a lista error
    app.put(BASE_NUTS_API_PATH+"nuts-production-stats", (req,res)=>{
        console.log("NEW PUT ...../nuts-production-stats");
        res.status(405).send("NOT ALLOWED");
    })

    // DELETE a lista
    app.delete(BASE_NUTS_API_PATH+"nuts-production-stats", (req,res)=>{
        console.log("NEW DELETE ...../nuts-production-stats");
        nutsstats = [];
        console.log("Data removed");
        res.sendStatus(200).send("Tabla eliminada");
    });

}