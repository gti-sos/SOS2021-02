var BASE_OIL_API_PATH = "/api/v1/";

var oilstats = [];
//prueba heroku
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
        if(oilstats.length>0){
            for(var j=0;j<oilstats.length;j++){
                oilstats.splice(j);
            }
        }
        for(var i=0;i<oilstatsInitial.length;i++){
            oilstats.push(oilstatsInitial[i]);
        }
        res.send(JSON.stringify(oilstats, null, 2));
    });
    //GET a toda la lista de recursos
    app.get(BASE_OIL_API_PATH+"oil-production-stats", (req, res) =>{
        res.send(JSON.stringify(oilstats, null, 2));
    });
    
    //GET a un recurso
    app.get(BASE_OIL_API_PATH+"oil-production-stats/:country/:year", (req, res) =>{
        var reqcountry = req.params.country;
        var reqyear = req.params.year;
        var sendData = [];
        for(var i=0; i<oilstats.length; i++) {
            if((String(oilstats[i].country) === reqcountry) && (oilstats[i].year === parseInt(reqyear))){
                sendData.push(oilstats[i]);
            }
        }
        res.send(JSON.stringify(sendData, null, 2));
    });
    
    //POST para crear un nuevo recurso en nuestra lista
    app.post(BASE_OIL_API_PATH+"oil-production-stats", (req, res) =>{
        var newCountry = req.body;
        console.log(`new country to be added:	<${JSON.stringify(newCountry,null,2)}>`);
        oilstats.push(newCountry);
        res.sendStatus(201);
    });
    
    //DELETE a /country/year
    app.delete(BASE_OIL_API_PATH+"oil-production-stats/:country/:year", (req,res)=>{
        console.log("NEW DELETE ...../oil-production-stats/country/year");
        var reqcountry = req.params.country;
        var reqyear = parseInt(req.params.year);
        var found = oilstats.find(e => (e.country === reqcountry) && (e.year === reqyear));
        if(!found){
            console.log("DATA NOT FOUND");
            res.sendStatus(404);
        }else{
            for(var i=0; i<oilstats.length; i++) {
                if((String(oilstats[i].country) === reqcountry) && (oilstats[i].year === reqyear)){
                    oilstats.splice(i,1);
                    console.log("DATA REMOVED");
                    res.sendStatus(200);
                }
            }
        }
    });
    
    
    // PUT a country/year
    app.put(BASE_OIL_API_PATH +"oil-production-stats/:country/:year",(req,res)=>{
        console.log("NEW PUT ...../oil-production-stats/country/year");
        var reqcountry=req.params.country;
        var reqyear=parseInt(req.params.year);
        var data=req.body;
        
        if(reqcountry!=data.country||reqyear!=data.year){
            res.sendStatus(400).send("BAD Request");
        }else{
            for(var i=0;i<oilstats.length ;i++){
                if((String(oilstats[i].country) === reqcountry) && (oilstats[i].year === reqyear)){
                    oilstats[i] = data;
                    res.sendStatus(200).send("DATA UPDATED");
                }
            }
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
        console.log("NEW DELETE ...../oil-production-stats");
        oilstats = [];
        console.log("Data removed");
        res.sendStatus(200).send("Tabla eliminada");
    });
}