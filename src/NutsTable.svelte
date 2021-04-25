<script>
    import {
        onMount
    } from "svelte";

    import Table from "sveltestrap/src/Table.svelte";
 
    let nutsstats = [];

    async function loadData(){
        console.log("Loading nutsstats...");
        const res = await fetch("/api/v1/nuts-production-stats/loadInitialData");

        if(res.ok){
            console.log("Ok.");
            getData();
            
        }else{
            console.log("Error!");
        }
    }   

    async function getData(){
        console.log("Fetching nutsstats...");
        const res = await fetch("/api/v1/nuts-production-stats");

        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            nutsstats = json;
            console.log(`We have received ${nutsstats.length} countries.`);
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
                <th>country</th>
                <th>year</th>
                <th>almond</th>
                <th>walnut</th>
                <th>pistachio</th>
                
            </tr>
        </thead>
        <tbody>
            {#each nutsstats as data}
                <tr>
                    <td>{data.country}</td>
                    <td>{data.year}</td>
                    <td>{data["almond"]}</td>
                    <td>{data["walnut"]}</td>
                    <td>{data["pistachio"]}</td>
                </tr>
            {/each}
        </tbody>
    </Table>
</main>
