<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    export let params = {};
    let data = {};
    let updateCountry = "XXXX";
    let updateYear = 9999;
    let updateProduction = 9999;
    let updateDistribution = 9999;
    let updateExportation = 9999;
    let errorMsg = "";

    onMount(getData);

    async function getData(){
        console.log("Fetching oilstats...");
        const res = await fetch(BASE_OIL_API_PATH+"oil-production-stats" + params.CountryName + "/" + params.CountryYear);

        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            data = json;
            updateCountry = data.country;
            updateYear = data.year;
            updateProduction= data["Production"];
            updateExportation= data["Exportation"];
            updateDistribution= data["Distribution"];
            


            console.log(`We have received ${oilstats.length} countries.`);
        }else{
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!" + errorMsg);
        }
    }   
    

    async function updateData() {

        console.log("Updating country..." + JSON.stringify(params.countryName)+JSON.stringify(params.countryYear));

        const res = await fetch("/api/v1/oil-production-stats/" + params.countryName + "/" + params.countryYear, {
            method: "PUT",
            body: JSON.stringify({
                country: params.countryName,
                year: params.countryYear,
                "Production": parseFloat(updateProduction),
                "Exportation": parseFloat(updateExportation),
                "Distribution": parseFloat(updateDistribution),
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            getData();
        });



    }

</script>

<main>
    <h1>
        oilAPI
    </h1>
    <Table bordered>
        <thead>
            <tr>
                <th>Pais</th>
                <th>Año</th>
                <th>Produccion</th>
                <th>Exportacion</th>
                <th>Distribucion</th>
                <th>Actions</th>
                
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value="{updateCountry}"></td>
                <td><input bind:value="{updateYear}"></td>
                <td><input bind:value="{updateProduction}"></td>
                <td><input bind:value="{updateExportation}"></td>
                <td><input bind:value="{updateDistribution}"></td>
                <td><Button on:click={updateData}>Actualizar</Button></td>
            </tr>
        </tbody>
    </Table>
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Back</Button>
</main>

