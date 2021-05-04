var BASE_WINE_API_PATH = "/api/v1/";
var Datastore = require('nedb');
var dat = require ('path');
var db = new Datastore({ filename: dat.join(__dirname, 'wine-stats.db'), autoload: true});
var winestats = [];


module.exports.register = (app) => {
    
    var winestatsInitial= [
        {
            "country": "Spain",
            "year": 2011,
            "production": 33397,
            "import": 703,
            "export": 22430
        },
        {
            "country": "Italy",
            "year": 2011,
            "production": 42772,
            "import": 2412,
            "export": 23238
        },
        {
            "country": "Greece",
            "year": 2011,
            "production": 9132,
            "import": 203,
            "export": 376
        },
        {
            "country": "Turkey",
            "year": 2011,
            "production": 596,
            "import": 80,
            "export": 25
        },
        {
            "country": "USA",
            "year": 2011,
            "production": 19187,
            "import": 10155,
            "export": 4210
        }
    ];
    //Get al info (tabla)
    app.get("/info/wine-production-stats", (request,response) => {
        response.send("<html><body><h1>Producción de vino a nivel mundial</h1><table border><tr><th>country</th><th>year</th><th>production</th><th>import</th><th>export</th></tr><tr><th>Spain</th><th>2011</th><th>33397</th><th>703</th><th>22430</th></tr><tr><th>Italy</th><th>2011</th><th>42772</th><th>2412</th><th>23238</th></tr><tr><th>Greece</th><th>2011</th><th>9132</th><th>203</th><th>376</th></tr><tr><th>Turkey</th><th>2011</th><th>596</th><th>80</th><th>25</th></tr><tr><th>USA</th><th>2011</th><th>19187</th><th>10155</th><th>4210</th></tr></table></body></html>");
        console.log("New request to /info/wine-production-stats has arrived");
    });
    
    //GET loadInitialData
    
    
       
        //Borrar db y cargar los datos iniciales
    app.get(BASE_WINE_API_PATH+"wine-production-stats/loadInitialData", (req, res) =>{
    db.remove({},{multi:true},function(err,numRemoved){});
    db.insert(winestatsInitial);
    res.sendStatus(200);
    console.log("Initial data loaded:"+JSON.stringify(winestatsInitial,null,2));
    });
    


    
    
    //GET a toda la lista de recursos
    
    app.get(BASE_WINE_API_PATH+"wine-production-stats", (req, res) =>{
        
        var query = req.query;
        var offset = query.offset;
        var limit = query.limit;
        delete query.offset;
        delete query.limit;

        //Pasamos los atributos de la query a Int
        if(query.hasOwnProperty("year")){
            query.year = parseInt(query.year);
        }
        if(query.hasOwnProperty("production")){
            query.production = parseFloat(query.production);
        }
        if(query.hasOwnProperty("import")){
            query.import = parseFloat(query.import);
        }
        if(query.hasOwnProperty("export")){
            query.export = parseFloat(query.export);
        }

        db.find(query).skip(offset).limit(limit).exec((err, wineInDB) => {
            if(err){
                console.error("ERROR accesing DB in GET");
                res.sendStatus(500);
            }
            else{
                if(wineInDB.length == 0){
                    console.error("No data found");
                    res.sendStatus(404);
                }
                else{
                    var dataToSend = wineInDB.map((c)=>{
                        return {country : c.country, year : c.year, production : c.production, import : c.import, export : c.export};
                    })
                    if(dataToSend.length==1){
                        var objectToSend = dataToSend[0];
                        res.send(JSON.stringify(objectToSend, null, 2));
                        console.log("Data sent:"+JSON.stringify(objectToSend, null, 2));
                    }else{
                        res.send(JSON.stringify(dataToSend, null, 2));
                        console.log("Data sent:"+JSON.stringify(dataToSend, null, 2));
                 }
              }
            }
        });
    });
    
    //GET a un recurso
    app.get(BASE_WINE_API_PATH+"wine-production-stats/:country/:year", (req, res) =>{
        var reqCountry = req.params.country;
        var reqYear = parseInt(req.params.year);

        db.find({ country: reqCountry, year: reqYear }, { _id: 0 }, function (err, data) {
            if (err) {
                console.error("ERROR in GET");
                res.sendStatus(500);
            } else {
                if (data.length == 0) {
                    console.error("No data found");
                    res.sendStatus(404);
                } else {
                    var send = data[0];
                    console.log(`NEW GET to <${reqCountry}>, <${reqYear}>`);
                    res.status(200).send(JSON.stringify(send, null, 2));
                }
            }
        });
    });
    //GET a un recurso concreto ERROR 1
    app.get(BASE_WINE_API_PATH+"wine-production-stats/:data", (req, res) => {
        console.error("BAD REQUEST");
        res.sendStatus(400).send("Incorrect fields");
    });

    //POST para crear un nuevo recurso en nuestra lista
    app.post(BASE_WINE_API_PATH+"wine-production-stats", (req, res) =>{
        console.log("New POST .../wine-production-stats");
        var newData = req.body;
        var country = req.body.country;
        var year = parseInt(req.body.year);
        db.find({"country":country, "year":year}).exec((err, data)=>{
            if(err){
                console.error("ERROR in GET");
                res.sendStatus(500);
            }else {
                if(data.length == 0){
                    if (!newData.country 
                        || !newData.year 
                        || !newData['production'] 
                        || !newData['import'] 
                        || !newData['export']
                        || Object.keys(newData).length != 5){
                        console.log("The data is not correct");
                        return res.sendStatus(400);
                    }else{
                        console.log("Data imput:"+JSON.stringify(newData, null, 2));
                        db.insert(newData);
                        res.sendStatus(201);
                    }

                }else{
                    res.sendStatus(409);
                    console.log("the data already exist");
                }
            }




        });

        
    });
    
    //DELETE a /country/year
    app.delete(BASE_WINE_API_PATH+"wine-production-stats/:country/:year", (req,res)=>{
    	console.log("NEW DELETE .....wine-production-stats/:country/:year");
			var reqcountry = req.params.country;
			var reqyear = parseInt(req.params.year);
			db.remove({country:reqcountry,year:reqyear},{multi:true}, (err, salida) => {
				if(salida==1){
					console.log("DATA REMOVED");
					res.sendStatus(200);
				}else{
					console.log("DATA NOT FOUND");
					res.sendStatus(404);
				}
			});
	});

    
    
    // PUT a country/year
    app.put(BASE_WINE_API_PATH +"wine-production-stats/:country/:year",(req,res)=>{
        console.log("NEW PUT ...../wine-production-stats/country/year");
        var country = req.params.country;
	    var year = req.params.year;
	    var newData = req.body;
	    var query = {"country":country, "year":parseInt(year)};
        if (!newData.country 
            || !newData.year 
            || !newData['production'] 
            || !newData['import'] 
            || !newData['export']
            || Object.keys(newData).length != 5){
            console.log("The data is not correct");
            return res.sendStatus(400);
        }
        
        else {
            db.update(query,newData,(err,numReplaced) =>{
                if(err){
                    console.error("ERROR in PUT");
                    res.sendStatus(500);
                }
                else{
                    if(numReplaced == 0){
                        res.sendStatus(404);
                        console.log("The data dont exist in the Database");
    
                    }
                    else{
                        res.sendStatus(200);
                        console.log("Database updated!");
                    }
                }
            });
        }
    });
    
    // POST a country/year error
    app.post(BASE_WINE_API_PATH+"wine-production-stats/:country", (req,res)=>{
        console.log("NEW POST ...../wine-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_WINE_API_PATH+"wine-production-stats/:year", (req,res)=>{
        console.log("NEW POST ...../wine-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_WINE_API_PATH+"wine-production-stats/:production", (req,res)=>{
        console.log("NEW POST ...../wine-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_WINE_API_PATH+"wine-production-stats/:exportation", (req,res)=>{
        console.log("NEW POST ...../wine-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_WINE_API_PATH+"wine-production-stats/:distribution", (req,res)=>{
        console.log("NEW POST ...../wine-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_WINE_API_PATH+"wine-production-stats/:country/:year", (req,res)=>{
        console.log("NEW POST ...../wine-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    });
    //PUT a lista error
    app.put(BASE_WINE_API_PATH+"wine-production-stats", (req,res)=>{
        console.log("NEW PUT ...../wine-production-stats");
        res.status(405).send("NOT ALLOWED");
    })
    
    // DELETE a lista
    app.delete(BASE_WINE_API_PATH+"wine-production-stats", (req,res)=>{
        db.remove({}, {multi:true}, function (err,numRemoved) {
            if (err) {
                console.error("ERROR deleting DB contacts in DELETE");
                res.sendStatus(500);
            }else{
                if(numRemoved == 0){
                    console.error("ERROR wine-stats not found");
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                }
            }
        });
        
    });
}