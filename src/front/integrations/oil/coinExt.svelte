<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    let coinsData = [];
    let ejeX= [];
    let supply = [];
    let maxSupply = [];
    let market = [];
    var URL = "https://api.coincap.io/v2/assets";

    async function loadGraph(){  

        const coins = await fetch(URL);
            coinsData = await coins.json();
            let cont = 0;
            
            let capData = [];
            coinsData.data.forEach((i)=>{
                let nameRank = i.id + "-" + i.rank;
                let y = parseFloat(i.supply);
                capData.push({y: y, label: nameRank});
                
                cont++;
            });
        
        
        var chart = new CanvasJS.Chart("chartContainer", {
	theme: "light2", // "light1", "light2", "dark1", "dark2"
	exportEnabled: true,
	animationEnabled: true,
	title: {
		text: "Suministro de circulación de las cryptomonedas"
	},
	data: [{
		type: "pie",
		startAngle: 25,
		toolTipContent: "<b>{label}</b>: {y}",
		showInLegend: "true",
		legendText: "{label}",
		indexLabelFontSize: 16,
		indexLabel: "{label} - {y}%",
		dataPoints: capData
	}]
});
chart.render();

}
</script>

<svelte:head>
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <div id="chartContainer" style="height: 370px; width: 100%;"></div>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button> 
</main>
