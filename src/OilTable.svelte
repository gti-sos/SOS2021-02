<script>
    import {
        onMount
    } from "svelte";

    import Table from "sveltestrap/src/Table.svelte";
 
    let oilstats = [];

    async function loadData(){
        console.log("Loading oilstats...");
        const res = await fetch("/api/v1/oil-production-stats/loadInitialData");

        if(res.ok){
            console.log("Ok.");
            getData();
            
        }else{
            console.log("Error!");
        }
    }   

    async function getData(){
        console.log("Fetching oilstats...");
        const res = await fetch("/api/v1/oil-production-stats");

        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            oilstats = json;
            console.log(`We have received ${oilstats.length} countries.`);
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
                <td>exportation</td>
                <td>distribution</td>
                
            </tr>
        </thead>
        <tbody>
            {#each oilstats as data}
                <tr>
                    <td>{data.country}</td>
                    <td>{data.year}</td>
                    <td>{data["production"]}</td>
                    <td>{data["exportation"]}</td>
                    <td>{data["distribution"]}</td>
                </tr>
            {/each}
        </tbody>
    </Table>
</main>

