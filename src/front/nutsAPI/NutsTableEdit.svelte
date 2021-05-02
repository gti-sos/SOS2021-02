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
    const BASE_NUTS_API_PATH = "/api/v1/";
    let data = {};
    let updateCountry = "XXXX";
    let updateYear = 9999;
    let updateAlmond = 9999;
    let updateWalnut = 9999;
    let updatePistachio = 9999;
    let errorMsg = "";

    onMount(getData);

    async function getData(){
        console.log("Fetching nutsstats..." + params.country + " " + params.year + " Link que llega: " + BASE_NUTS_API_PATH+"nuts-production-stats/" + params.country + "/" + params.year);
        const res = await fetch(BASE_NUTS_API_PATH+"nuts-production-stats/" + params.country + "/" + params.year);

        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            data = json;
            updateCountry = data.country;
            updateYear = data.year;
            updateAlmond= data["almond"];
            updateWalnut= data["walnut"];
            updatePistachio= data["pistachio"];
            console.log(`Los datos actualizados son: ${updateCountry} ${updateYear} ${updateAlmond} ${updateWalnut} ${updatePistachio}`);
            


            console.log(`We have received ${data.length} countries.`);
        }else{
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!" + errorMsg);
        }
    }   
    

    async function updateData() {

        console.log("Updating country..." + JSON.stringify(params.country)+JSON.stringify(params.year));

        const res = await fetch("/api/v1/nuts-production-stats/" + params.country + "/" + params.year, {
            method: "PUT",
            body: JSON.stringify({
                "country": params.country,
                "year": parseInt(params.year),
                "almond": parseInt(updateAlmond),
                "walnut": parseInt(updateWalnut),
                "pistachio": parseInt(updatePistachio),
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
        nutsAPI
    </h1>
    <Table bordered>
        <thead>
            <tr>
                <th>Pais</th>
                <th>Año</th>
                <th>Almendra</th>
                <th>Nuez</th>
                <th>Pistacho</th>
                <th>Acciones</th>
                
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value="{updateCountry}"></td>
                <td><input bind:value="{updateYear}"></td>
                <td><input bind:value="{updateAlmond}"></td>
                <td><input bind:value="{updateWalnut}"></td>
                <td><input bind:value="{updatePistachio}"></td>
                <td><Button on:click={updateData}>Actualizar</Button></td>
            </tr>
        </tbody>
    </Table>
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Retroceder</Button>
</main>

