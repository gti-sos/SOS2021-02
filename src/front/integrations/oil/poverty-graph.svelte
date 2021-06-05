<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    let povertyData = [];
    let peopleRisk = [];
    let peopleLine = [];
    let homePoverty = [];
    let percentagePoverty = [];
    let cont = 0;
    let ejeX = [];
    var mapa = new Map();
    var URL = " https://endpoint-poverty-risks.herokuapp.com/api/v1/" // Si no carga la página esque hay que hacer un loadInitialData en el enlace de la API.


    function filtraElementos(value, key, map) {
        if(value){
            ejeX.push(key);
            peopleRisk.push(value[0]);
            peopleLine.push(value[1]);
            homePoverty.push(value[2]);
            percentagePoverty.push(value[3]);
        }
    }
    
    async function loadGraph(){  
        const load = await fetch("https://endpoint-poverty-risks.herokuapp.com/api/v1/loadInitialData");
        if(load.ok){

        
        const poverty = await fetch(URL);

        povertyData = await poverty.json();
            console.log(`We have received ${povertyData.length} data points: `);
            console.log(JSON.stringify(povertyData,null,2));
            let risk= [];
            let bubbleData = [];
            povertyData.forEach((i)=>{
            let countryYearData = i.country +  "-" + i.year;
            let riskData = parseFloat(i.people_in_risk_of_poverty);
            let lineData = parseFloat(i.people_poverty_line);
            let homeData = parseFloat(i.home_poverty_line);
            let percentData = parseFloat(i.percentage_risk_of_poverty);
            
            risk.push(riskData);
            bubbleData.push({w: riskData, x:lineData, y: homeData, z: percentData, name:countryYearData});
            
            cont++;
            
            });
        console.log(risk);
        console.log("bubbleData:");
        console.log(bubbleData);
        console.log(mapa);

        mapa.forEach(filtraElementos);

        var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title:{
		text: "La pobreza en nuestra sociedad"
	},
	axisX: {
		title:"Indice de riesgo de pobreza por persona"
	},
	axisY: {
		title:"Riesgo de pobreza en el hogar",
		includeZero: true
	},
	legend:{
		horizontalAlign: "left"
	},
	data: [{
		type: "bubble",
		showInLegend: true,
		legendText: "Size of Bubble Represents Population in Millions",
		legendMarkerType: "circle",
		legendMarkerColor: "grey",
		toolTipContent: "<b>{name}</b><br/>Poverty Line: {x}<br/> Risk Poverty: {w}<br/> Home Poverty: {y}<br/> Percentage Poverty {z}",
		dataPoints: bubbleData
	}]
});
chart.render();

}
  }
</script>

<svelte:head>
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <div id="chartContainer" style="height: 370px; width: 100%;"></div>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button> 
</main>