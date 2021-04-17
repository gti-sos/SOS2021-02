var BASE_OIL_API_PATH = "/api/v1/";
var DataStore = require("nedb");
var db = new DataStore();
var oilstats = [];

module.exports.register = (app) => {
    var oilstatsInitial = [
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
            "country": "Greece",
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
    
    
    //GET info (tabla)
    
    app.get("/info/oil-production-stats", (request,response) => {
        response.send("<html><body><h1>En esta tabla se muestra la producción, distribución y exportación de aceite en distintos paises del mundo</h1><table border><tr><th>country</th><th>year</th><th>production</th><th>exportation</th><th>distribution</th></tr><tr><th>Spain</th><th>2011</th><th>669,1</th><th>48,36</th><th>18,61</th></tr><tr><th>Italy</th><th>2011</th><th>735</th><th>28,74</th><th>22,12</th></tr><tr><th>Greece</th><th>2011</th><th>420</th><th>5,48</th><th>7,71</th></tr><tr><th>Turkey</th><th>2011</th><th>160</th><th>1.26</th><th>3.85</th></tr><tr><th>USA</th><th>2011</th><th>3</th><th>0.38</th><th>9.22</th></tr></table></body></html>");
        console.log("New request to /info/oil-production-stats has arrived");
    });


    //GET loadInitialData
    app.get(BASE_OIL_API_PATH+"oil-production-stats/loadInitialData", (req, res) =>{
    db.remove({},{multi:true},function(err,numRemoved){});
    db.insert(oilstatsInitial);
    res.sendStatus(200);
    console.log("Initial data loaded:"+JSON.stringify(oilstatsInitial,null,2));
    });


    
    //GET a toda la lista de recursos
    app.get(BASE_OIL_API_PATH+"oil-production-stats", (req, res) =>{
        
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
        if(query.hasOwnProperty("exportation")){
            query.exportation = parseFloat(query.exportation);
        }
        if(query.hasOwnProperty("distribution")){
            query.distribution = parseFloat(query.distribution);
        }

        db.find(query).skip(offset).limit(limit).exec((err, oilInDB) => {
            if(err){
                console.error("ERROR accesing DB in GET");
                res.sendStatus(500);
            }
            else{
                if(oilInDB.length == 0){
                    console.error("No data found");
                    res.sendStatus(404);
                }
                else{
                    var dataToSend = oilInDB.map((c)=>{
                        return {country : c.country, year : c.year, production : c.production, exportation : c.exportation, distribution : c.distribution};
                    })
                    res.send(JSON.stringify(dataToSend, null, 2));
                    console.log("Data sent:"+JSON.stringify(dataToSend, null, 2));
                 }
            }
        });
    });
    //GET a un recurso
    app.get(BASE_OIL_API_PATH+"oil-production-stats/:country/:year", (req, res) => {
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
                    console.log(`NEW GET to <${reqCountry}>, <${reqYear}>`);
                    res.status(200).send(JSON.stringify(data, null, 2));
                }
            }
        });
    });
    
    //POST para crear un nuevo recurso en nuestra lista
    app.post(BASE_OIL_API_PATH+"oil-production-stats", (req, res) =>{
        var newCountry = req.body;
        console.log(`new country to be added:	<${JSON.stringify(newCountry,null,2)}>`);

        db.find({name : newCountry.country}, (err, oilinDB)=>{
            if(err){
                console.error("ERROR accessing DB in GET " + err);
                res.sendStatus(500);
            }else{
                if(oilinDB.length == 0){
                    console.log("Inserting newContact in DB" + JSON.stringify(newCountry,null,2));
                    db.insert(newCountry);
                    res.sendStatus(201); // CREATED
                }else{
                    res.sendStatus(409);//CONFLICT
                }
    
            }
        });
    

    });
    
    //DELETE a /country/year
    app.delete(BASE_OIL_API_PATH+"oil-production-stats/:country/:year", (req,res)=>{
		console.log("NEW DELETE .....oil-production-stats/:country/:year");
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
    app.put(BASE_OIL_API_PATH +"oil-production-stats/:country/:year", (req,res)=>{
        console.log("NEW PUT ...../oil-production-stats/country/year");
        var reqcountry=req.params.country;
        var reqyear=parseInt(req.params.year);
        var data=req.body;
        
        if(reqcountry!=data.country||reqyear!=data.year){
			res.status(400).send("BAD DATA");
		}else{
			db.remove({country: reqcountry, year: reqyear}, { multi: true }, function (err, salida) {});
			db.insert(data);
			res.sendStatus(200);
				
			
		}
    });
    
    // POST a country/year error
    app.post(BASE_OIL_API_PATH+"oil-production-stats/:country", (req,res)=>{
        console.log("NEW POST ...../oil-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_OIL_API_PATH+"oil-production-stats/:year", (req,res)=>{
        console.log("NEW POST ...../oil-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_OIL_API_PATH+"oil-production-stats/:production", (req,res)=>{
        console.log("NEW POST ...../oil-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_OIL_API_PATH+"oil-production-stats/:exportation", (req,res)=>{
        console.log("NEW POST ...../oil-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_OIL_API_PATH+"oil-production-stats/:distribution", (req,res)=>{
        console.log("NEW POST ...../oil-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_OIL_API_PATH+"oil-production-stats/:country/:year", (req,res)=>{
        console.log("NEW POST ...../oil-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    });
    
    //PUT a lista error
    app.put(BASE_OIL_API_PATH+"oil-production-stats", (req,res)=>{
        console.log("NEW PUT ...../oil-production-stats");
        res.status(405).send("NOT ALLOWED");
    })
    
    // DELETE a lista
    app.delete(BASE_OIL_API_PATH+"oil-production-stats", (req,res)=>{
        db.remove({}, {multi:true}, function (err,numRemoved) {
            if (err) {
                console.error("ERROR deleting DB oilinDB in DELETE");
                res.sendStatus(500);
            }else{
                if(numRemoved == 0){
                    console.error("ERROR oil-stats not found");
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                }
            }
        });
        
    });
}