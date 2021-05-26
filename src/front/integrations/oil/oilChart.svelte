<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
 
    
    let oilData = [];
    

    async function loadGraph() {
    
    const data = await fetch("/api/v1/oil-production-stats");
    oilData = await data.json();
    let dataValue=[0,0,0];
    let contador = 0;
    oilData.forEach((i)=>{
        dataValue[0]+=i.production;
        dataValue[1]+=i.exportation;
        dataValue[2]+=i.distribution;
    });
    let productionData = [];
    let exportationData = [];
    let distributionData = [];

        oilData.forEach((i)=>{
            let country = i.country;
            let y = i.production;
            let y2 = i.exportation;
            let y3 = i.distribution;
            productionData.push({label: country, y: y});
            exportationData.push({label: country, y: y2});
            distributionData.push({label: country, y: y3});
            contador++;
        });
        
    console.log(dataValue);
    console.log(productionData);
    
        var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light1", // "light2", "dark1", "dark2"
        animationEnabled: true, // change to true		
        title:{
            text: "Datos de produccion y exportacion del aceite en el mundo"
        },
        data: [
        {
            // Change type to "bar", "area", "spline", "pie",etc.
            type: "column",
            name: "production",
            showInLegend: true,
            dataPoints: productionData
        },{
            type: "column",
            name: "exportation",
            showInLegend: true,
            dataPoints: exportationData
    
        },{
            type: "column",
            name: "distribution",
            showInLegend: true,
            dataPoints: distributionData
        }]
    });
    chart.render();
    
    }
    </script>
    <svelte:head>
        <script src="https://canvasjs.com/assets/script/canvasjs.min.js" on:load="{loadGraph}"> </script>
    </svelte:head>

    <main>
        <div id="chartContainer" style="height: 370px; width: 100%;"></div>
        </main>