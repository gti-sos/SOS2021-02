<script type="text/javascript">
    import * as echarts from 'echarts';
    import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'
    // based on prepared DOM, initialize echarts instance
    var myChart = echarts.init(document.getElementById('main'));

    // specify chart configuration item and data
    var option = {
        title: {
            text: 'ECharts entry example'
        },
        tooltip: {},
        legend: {
            data:['Sales']
        },
        xAxis: {
            data: ["shirt","cardign","chiffon shirt","pants","heels","socks"]
        },
        yAxis: {},
        series: [{
            name: 'Sales',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // use configuration item and data specified to show chart
    myChart.setOption(option);
</script>

<!-- including ECharts file 
<script>
    import {
        onMount
    } from "svelte";
 
    //let generalData = [];   
    let nutsData = [];
    let ejeX = [];
    let almond = [];
    let walnut = [];
    let pistachio = [];
    
    async function loadGraph(){  
        const nuts = await fetch("/api/v2/nuts-production-stats");
        if(nuts.ok){
            nutsData = await nuts.json();
            console.log(`We have received ${nutsData.length} data points: `);
            console.log(JSON.stringify(nutsData,null,2));
            nutsData.forEach(data => {
                ejeX.push(data.country + "-" + data.year);
                almond.push(data["almond"]);
                walnut.push(data["walnut"]);
                pistachio.push(data["pistachio"]);
            });
        }else{
            console.log("Error loading nuts");
        }

        var chart = c3.generate({
            bindto: '#chart',
            data: {
                columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 50, 20, 10, 40, 15, 25]
            ]
            }
        });
        chart;
    }

  
       
</script>
-->
<svelte:head>
    <meta charset="utf-8">
    <!-- including ECharts file -->
    <script src="echarts.min.js" on:load="{loadGraph}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/4.1.0/echarts-en.common.min.js"></script>
    
</svelte:head>

<main>
    <!-- preparing a DOM with width and height for ECharts -->
    <div id="main" style="width:600px; height:400px;"></div>
</main>