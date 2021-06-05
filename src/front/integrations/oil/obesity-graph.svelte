<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    let obesityData = [];
    //let manPercent = [];
    //let womanPercent = [];
    //let totalPopulation = [];
    let ejeX = [];
    let country = [];
    let cont = 0;
    var mapa = new Map();
    var URL = " http://sos2021-10.herokuapp.com/api/integration/obesity-stats"


    /*function filtraElementos(value, key, map) {
        if(value){
            ejeX.push(key);
            manPercent.push(value[0]);
            womanPercent.push(value[1]);
            totalPopulation.push(value[2]);
        }
    }*/
    
    async function loadGraph(){  

        const obesity = await fetch(URL);
            obesityData = await obesity.json();
            console.log(`We have received ${obesityData.length} data points: `);
            console.log(JSON.stringify(obesityData,null,2));

            let countryYear = [];
            let dataMan = [];
            let dataWoman = [];
            let dataTotal = [];
            obesityData.forEach((i)=>{
            let countryYearData = i.country +  "-" + i.year;
            let manPercentData = parseFloat(i.man_percent);
            let womanPercentData = parseFloat(i.woman_percent);
            let totalPopulationData = parseFloat(i.total_population);
            dataMan.push({y: manPercentData, label: countryYearData});
            dataWoman.push({y: womanPercentData, label: countryYearData});
            dataTotal.push({y: totalPopulationData, label: countryYearData});
            
            cont++;
        });
        console.log(countryYear);
        console.log(dataMan);
        console.log(dataWoman);
        console.log(dataTotal);
        
        

        console.log(mapa);

        
        var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title:{
		text: "Olympic Medals of all Times (till 2016 Olympics)"
	},
	axisY: {
		title: "Medals",
		includeZero: true
	},
	legend: {
		cursor:"pointer",
		itemclick : toggleDataSeries
	},
	toolTip: {
		shared: true,
		content: toolTipFormatter
	},
	data: [{
		type: "bar",
		showInLegend: true,
		name: "manPercent",
		color: "gold",
		dataPoints: dataMan
	},
	{
		type: "bar",
		showInLegend: true,
		name: "womanPercent",
		color: "silver",
		dataPoints: dataWoman
	},
	{
		type: "bar",
		showInLegend: true,
		name: "totalPopulation",
		color: "#A57164",
		dataPoints: dataTotal
	}]
});
chart.render();

function toolTipFormatter(e) {
	var str = "";
	var total = 0 ;
	var str3;
	var str2 ;
	for (var i = 0; i < e.entries.length; i++){
		var str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\">" + e.entries[i].dataSeries.name + "</span>: <strong>"+  e.entries[i].dataPoint.y + "</strong> <br/>" ;
		total = e.entries[i].dataPoint.y + total;
		str = str.concat(str1);
	}
	str2 = "<strong>" + e.entries[0].dataPoint.label + "</strong> <br/>";
	str3 = "<span style = \"color:Tomato\">Total: </span><strong>" + total + "</strong><br/>";
	return (str2.concat(str)).concat(str3);
}

function toggleDataSeries(e) {
	if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else {
		e.dataSeries.visible = true;
	}
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