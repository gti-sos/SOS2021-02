var BASE_WINE_API_PATH = "/api/v1/";

var winestats = [];
//prueba heroku
module.exports.register = (app) => {
    
    var winestatsInitial= [
        {
            "country": "Spain",
            "year": 2011,
            "production-wine": 33397,
            "wine-import": 703,
            "wine-export": 22430
        },
        {
            "country": "Italy",
            "year": 2011,
            "production-wine": 42772,
            "wine-import": 2412,
            "wine-export": 23238
        },
        {
            "country": "Greece",
            "year": 2011,
            "production-wine": 9132,
            "wine-import": 203,
            "wine-export": 376
        },
        {
            "country": "Turkey",
            "year": 2011,
            "production-wine": 596,
            "wine-import": 80,
            "wine-export": 25
        },
        {
            "country": "USA",
            "year": 2011,
            "production-wine": 19187,
            "wine-import": 10155,
            "wine-export": 4210
        }
    ];
    //Get al info (tabla)
    app.get("/info/wine-production-stats", (request,response) => {
        response.send("<html><body><h1>Producción de vino a nivel mundial</h1><table border><tr><th>country</th><th>year</th><th>productions-wine</th><th>wine-import</th><th>wine-export</th></tr><tr><th>Spain</th><th>2011</th><th>33397</th><th>703</th><th>22430</th></tr><tr><th>Italy</th><th>2011</th><th>42772</th><th>2412</th><th>23238</th></tr><tr><th>Greece</th><th>2011</th><th>9132</th><th>203</th><th>376</th></tr><tr><th>Turkey</th><th>2011</th><th>596</th><th>80</th><th>25</th></tr><tr><th>USA</th><th>2011</th><th>19187</th><th>10155</th><th>4210</th></tr></table></body></html>");
        console.log("New request to /info/wine-production-stats has arrived");
    });
    
    //GET loadInitialData
    
    app.get(BASE_WINE_API_PATH+"wine-production-stats/loadInitialData", (req, res) =>{
        if(winestats.length>0){
            for(var j=0;j<winestats.length;j++){
                winestats.splice(j);
            }
        }
        for(var i=0;i<winestatsInitial.length;i++){
            winestats.push(winestatsInitial[i]);
        }
        res.send(JSON.stringify(winestats, null, 2));
    });
    
    
    //GET a toda la lista de recursos
    app.get(BASE_WINE_API_PATH+"wine-production-stats", (req, res) =>{
        res.send(JSON.stringify(winestats, null, 2));
    });
    
    //GET a un recurso
    app.get(BASE_WINE_API_PATH+"wine-production-stats/:country/:year", (req, res) =>{
        var reqcountry = req.params.country;
        var reqyear = req.params.year;
        var sendData = [];
        for(var i=0; i<winestats.length; i++) {
            if((String(winestats[i].country) === reqcountry) && (winestats[i].year === parseInt(reqyear))){
                sendData.push(winestats[i]);
            }
        }
        res.send(JSON.stringify(sendData, null, 2));
    });
    
    //POST para crear un nuevo recurso en nuestra lista
    app.post(BASE_WINE_API_PATH+"wine-production-stats", (req, res) =>{
        var newCountry = req.body;
        console.log(`new country to be added:	<${JSON.stringify(newCountry,null,2)}>`);
        winestats.push(newCountry);
        res.sendStatus(201);
    });
    
    //DELETE a /country/year
    app.delete(BASE_WINE_API_PATH+"wine-production-stats/:country/:year", (req,res)=>{
        console.log("NEW DELETE ...../wine-production-stats/country/year");
        var reqcountry = req.params.country;
        var reqyear = parseInt(req.params.year);
        var found = winestats.find(e => (e.country === reqcountry) && (e.year === reqyear));
        if(!found){
            console.log("DATA NOT FOUND");
            res.sendStatus(404);
        }else{
            for(var i=0; i<winestats.length; i++) {
                if((String(winestats[i].country) === reqcountry) && (winestats[i].year === reqyear)){
                    winestats.splice(i,1);
                    console.log("DATA REMOVED");
                    res.sendStatus(200);
                }
            }
        }
    });
    
    // PUT a country/year
    app.put(BASE_WINE_API_PATH +"wine-production-stats/:country/:year",(req,res)=>{
        console.log("NEW PUT ...../wine-production-stats/country/year");
        var reqcountry=req.params.country;
        var reqyear=parseInt(req.params.year);
        var data=req.body;
        
        if(reqcountry!=data.country||reqyear!=data.year){
            res.sendStatus(400).send("BAD Request");
        }else{
            for(var i=0;i<winestats.length ;i++){
                if((String(winestats[i].country) === reqcountry) && (winestats[i].year === reqyear)){
                    winestats[i] = data;
                    res.sendStatus(200).send("DATA UPDATED");
                }
            }
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
        console.log("NEW DELETE ...../wine-production-stats");
        winestats = [];
        console.log("Data removed");
        res.sendStatus(200).send("Tabla eliminada");
    });
};