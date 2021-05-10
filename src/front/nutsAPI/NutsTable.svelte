<script>
    import {
        onMount
    } from "svelte";
    import {
        pop
    } from "svelte-spa-router";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    var BASE_NUTS_PATH = "/api/v2/";
    let nutsstats = [];
    let newCountry = {
        country: "",
        year: "",
        "almond": "",
        "walnut": "",
        "pistachio": "",
    }
    let searchCountry = {
        country: "",
        year: "",
        "almond": "",
        "walnut": "",
        "pistachio": "",
    }
    let errorMsg = "";
    let okMsg = "";

    let limit = 10;
	let offset = 0;
    let actual = 1;
    let numData = 5;

    async function loadData(){
        console.log("Loading nutsstats...");
        const res = await fetch(BASE_NUTS_PATH+"nuts-production-stats/loadInitialData");

        if(res.ok){
            console.log("Ok.");
            numData=5;
            getData();
            errorMsg = "";
            okMsg = "Datos cargados correctamente."
            
        }else{
            console.log("Error!");
        }
    }   

    async function getData(){
        console.log("Fetching nutsstats...");
        var url = BASE_NUTS_PATH+"nuts-production-stats?limit="+limit+"&offset="+offset;//*limit);
        const res = await fetch(url);

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

    async function insertCountry(){
        console.log("Inserting country "+ JSON.stringify(newCountry));
        newCountry.country = (newCountry.country);
        newCountry.year = parseInt(newCountry.year);
        newCountry["almond"] = parseInt(newCountry["almond"]);
        newCountry["walnut"] = parseInt(newCountry["walnut"]);
        newCountry["pistachio"] = parseInt(newCountry["pistachio"]);

        const res = await fetch(BASE_NUTS_PATH+"nuts-production-stats",
                            {
                                method: "POST",
                                body: JSON.stringify(newCountry),
                                headers:{
                                    "Content-Type": "application/json"
                                }
                            }
                           ).then( (res) => {
                                if(res.ok) {
                                numData++;
                                console.log("NUMDATA IS:" + numData);
                                getData();
                                okMsg = `${newCountry.country} ${newCountry.year} ha sido insertado correctamente.`
                                errorMsg = "";
                                }else{
                                   if(res.status === 409){
                                       okMsg = "";
                                       errorMsg = `${newCountry.country} ${newCountry.year} ya se encuentra cargado.`
                                   }
                                console.log("ERROR!" + errorMsg);
                               }
                            
                           })
    }

    async function deleteCountry(country, year){
        console.log("Deleting country " + country + year);

        const res = await fetch(BASE_NUTS_PATH+"nuts-production-stats/"+country + "/" + year,
                            {
                                method: "DELETE",
                            }
                            ).then( (res) => {
                                if(res.ok) {
                                numData--;
                                console.log("NUMDATA IS:" + numData);
                                getData();
                                okMsg = `${country} ${year} ha sido eliminado correctamente.`
                                errorMsg = "";
                                }else{
                                    if(res.status === 404){
                                       okMsg = "";
                                       errorMsg = `${country} ${year} no se encuentra en la base de datos.`
                                    }
                                console.log("ERROR!" + errorMsg);
                               }
                            
                           })
    }

    async function deleteAllCountries(){
        console.log("Deleting all countries ");

        const res = await fetch(BASE_NUTS_PATH+"nuts-production-stats/",
            {
                    method: "DELETE",
            }
            ).then(function (res) {
                    if (res.ok) {
                        console.log("OK");
                        nutsstats = [];
                        numData = 0;
                        errorMsg = "";
                        okMsg = "Datos borrados correctamente";
                    } else {
                        if(res.status===404){
                            okMsg = "";
                            errorMsg = "No existen datos que borrar";
                        }else if(res.status ===500){
                            okMsg = "";
                            errorMsg = "No se han podido acceder a la base de datos";
                        }        
                            okMsg = "";
                            console.log("ERROR!" + errorMsg);
                    }
            });
    }

    async function nextPage() {
        if (offset+10 > numData) {
            if(numdata!=0){
                offset += numData;
            actual = 2;
            }
        } else {
            offset +=10
            actual = 2;
        }
        console.log("Offset: "+ offset);
        const res = await fetch(BASE_NUTS_PATH+"nuts-production-stats?limit="+limit+"&offset="+offset);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            nutsstats = json;
            console.log("Received " + nutsstats.length + " data.");
        } else {
            console.log("ERROR!");
        }
    }

    async function previousPage() {
 
        if (offset-10>=1) {
            offset -= 10; 
            actual -= 1;
        } else {
            offset = 0
            actual = 1;
        }
        console.log("Offset: " +offset);
        const res = await fetch(BASE_NUTS_PATH+"nuts-production-stats?limit="+limit+"&offset="+offset);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            nutsstats = json;
            console.log("Received " + nutsstats.length + " data.");
        } else {
            console.log("ERROR!");
        }
    }

    async function searchCountries(offset) {
		let url = "/api/v2/nuts-production-stats?limit=10&offset="+ offset;
		console.log("Searching countries...");
		let data = {
			country: searchCountry.country,
			year: parseInt(searchCountry.year),
			almond: parseInt(searchCountry.almond),
			walnut: parseInt(searchCountry.walnut),
			pistachio: parseInt(searchCountry.pistachio),
			
		};
		Object.entries(data).forEach(([x,y]) => {
			if(y){
				url = url + "&" + x + "=" + y;
			}
		});
	
		console.log("esta es la url:"+ url);
		const res = await fetch(url);
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			nutsstats = json;
			console.log("Received " + nutsstats.length + " countries.");
			if (nutsstats.length > 0){
				okMsg = "Se ha realizado la búsqueda.";
				errorMsg = false;
			}else{
				okMsg = false;
				errorMsg = "La búsqueda no ha obtenido resultados.";
			};
			
		} else {
			console.log("ERROR!");
			okMsg = false;
			errorMsg = "La búsqueda no ha obtenido resultados.";
		};
	};



    onMount(getData);
</script>

<main>
    <h1>
        Tabla Frutos Secos
    </h1>
    <div>
        {#if errorMsg}
        <p class="msgRed" style="color: #9d1c24">ERROR: {errorMsg}</p>
    {/if}
        {#if okMsg}
      <p class="msgGreen" style="color: #155724">{okMsg}</p>
    {/if}
    </div>

    <Table>
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
                <td><input bind:value="{searchCountry.country}"></td>
                <td><input bind:value="{searchCountry.year}"></td>
                <td><input bind:value="{searchCountry['almond']}"></td>
                <td><input bind:value="{searchCountry['walnut']}"></td>
                <td><input bind:value="{searchCountry['pistachio']}"></td>
                <td><Button outline color="warning" on:click={searchCountries}>Buscar</Button></td>
            </tr>
        </tbody>
    </Table>
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
                <td><input bind:value="{newCountry.country}"></td>
                <td><input bind:value="{newCountry.year}"></td>
                <td><input bind:value="{newCountry['almond']}"></td>
                <td><input bind:value="{newCountry['walnut']}"></td>
                <td><input bind:value="{newCountry['pistachio']}"></td>
                <td><Button outline color="primary" on:click={insertCountry}>Insertar</Button></td>
            </tr>
            {#each nutsstats as data}
                <tr>
                    <td><a href="#/nuts-production-stats/{data.country}/{data.year}">{data.country}</a></td>
                    <td>{data.year}</td>
                    <td>{data["almond"]}</td>
                    <td>{data["walnut"]}</td>
                    <td>{data["pistachio"]}</td>
                    <td><Button outline color="danger" on:click={deleteCountry(data.country, data.year)}>Borrar</Button></td>
                </tr>
            {/each}
        </tbody>
    </Table>
    <Button outline color="info" on:click="{previousPage}">Página anterior</Button>
    <Button>{actual}</Button>
    <Button outline color="info" on:click="{nextPage}">Siguiente Página</Button>
    <Button outline color="secondary" on:click="{pop}">Retroceder</Button>
    <Button outline color="primary" on:click="{loadData}">Cargar datos iniciales</Button>
    <Button outline color="danger" on:click="{deleteAllCountries}">Borrar todos los datos</Button>
</main>

<style>
    p {
    display: inline;
  }

  .msgRed {
    padding: 8px;
    background-color: #f8d7da;
  }

  .msgGreen {
    padding: 8px;
    background-color: #d4edda;
  }

  div{
    margin-bottom: 15px;
  }
</style>