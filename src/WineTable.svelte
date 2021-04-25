<script>
    import {
        onMount
    } from "svelte";

    import Table from "sveltestrap/src/Table.svelte";
 
    let winestats = [];
    async function loadData(){
        console.log("Loading winestats...");
        const res = await fetch("/api/v1/wine-production-stats/loadInitialData");

        if(res.ok){
            console.log("Ok.");
            getData();
            
        }else{
            console.log("Error!");
        }
    }   

    async function getData(){
        console.log("Fetching winestats...");
        const res = await fetch("/api/v1/wine-production-stats");

        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            winestats = json;
            console.log(`We have received ${winestats.length} countries.`);
        }else{
            console.log("Error!");
        }
    }   
    
    onMount(getData);
</script>

<main>
    <Table bordered>
        <thead>
            <tr>
                <td>country</td>
                <td>year</td>
                <td>production</td>
                <td>import</td>
                <td>export</td>
                
            </tr>
        </thead>
        <tbody>
            {#each winestats as data}
                <tr>
                    <td>{data.country}</td>
                    <td>{data.year}</td>
                    <td>{data["production"]}</td>
                    <td>{data["import"]}</td>
                    <td>{data["export"]}</td>
                </tr>
            {/each}
        </tbody>
    </Table>
</main>

