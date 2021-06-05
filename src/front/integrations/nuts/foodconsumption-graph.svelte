<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    let foodData = [];
    let caloryPer = [];
    let gramPer = [];
    let dailyGram = [];
    let dailyCal = [];
    let ejeX = [];
    var mapa = new Map();
    var URL = "https://sos2021-10.herokuapp.com/api/integration/foodconsumption-stats";

    function filtraElementos(value, key, map) {
        if(value){
            ejeX.push(key);
            caloryPer.push(value[0]);
            gramPer.push(value[1]);
            dailyGram.push(value[2]);
            dailyCal.push(value[3]);
        }
    }
    
    async function loadGraph(){  

        const food = await fetch(URL);
        if(food.ok){
            foodData = await food.json();
            console.log(`We have received ${foodData.length} data points: `);
            console.log(JSON.stringify(foodData,null,2));
            foodData.forEach(data => {
                if(mapa.has(data.country + "-" + data.year)){
                    let aux = mapa.get(data.country + "-" + data.year);
                    aux.push(data["caloryperperson"]);
                    aux.push(data["gramperperson"]);
                    aux.push(data["dailygram"]);
                    aux.push(data["dailycalory"]);
                    mapa.set(data.country + "-" + data.year, aux);
                }else{
                    console.log(data["caloryperperson"]);
                    let aux = [];
                    aux.push(data["caloryperperson"]);
                    aux.push(data["gramperperson"]);
                    aux.push(data["dailygram"]);
                    aux.push(data["dailycalory"]);
                    console.log(aux);
                    mapa.set(data.country + "-" + data.year, aux);
                }
            });
        }else{
            console.log("Error loading food");
        }
        
        console.log(mapa);

        mapa.forEach(filtraElementos);

        var trace1 = {
        x: caloryPer,
        y: gramPer,
        text: ejeX,
        mode: 'markers',
        };

        var data = [trace1];

        var layout = {
        title: 'Gráfico que muestra una comparativa de calorías-gramos ingeridos por persona en diferentes países y fechas',
        showlegend: false,
        height: 1000,
        width: 1000
        };

        Plotly.newPlot('graph', data, layout);
  }
</script>

<svelte:head>
    <script src="https://cdn.plot.ly/plotly-latest.min.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <div id="graph"></div>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button> 
</main>