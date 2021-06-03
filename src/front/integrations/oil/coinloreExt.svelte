<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    let extcoin = [];
    let ejeX= [];
    let priceUsd = [];
    let percent24 = [];
    let percent1 = [];
    let percent7 = [];
    let Datos = [];
    var URL = "https://api.coinlore.net/api/tickers/?start=20&limit=10";
//"/proxyCoinlore"
   
    async function loadGraph(){  

        const data = await fetch("/proxyCoinlore");
        extcoin = await data.json();
        let datacoin=[0];
        let cont = 0;
        extcoin.data.forEach((i)=>{
        datacoin[0]+=i.price_usd;
    });
    let usdData = [];
    extcoin.data.forEach((i)=>{
            let nameSymbol = i.name + "-" + i.symbol;
            let y = parseFloat(i.price_usd);
            usdData.push({label: nameSymbol, y: y});
            
            cont++;
        });
        console.log(usdData);
        
       console.log(usdData);
       var chart = new CanvasJS.Chart("chartContainer", {
            theme: "dark2", // "light1", "light2", "dark1"
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "Precio USD cryptomonedas"
            },
            axisX: {
                margin: 100,
                labelPlacement: "outside",
                tickPlacement: "outside"
            },
            axisY2: {
                title: "Prices",
                titleFontSize: 14,
                includeZero: true,
                suffix: ""
            },
            data: [{
                type: "bar",
                axisYType: "secondary",
                yValueFormatString: "#,###.##",
                indexLabel: "{y}",
                dataPoints: usdData
                
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
