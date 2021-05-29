<script>
    let pluginCycling = [];
    let MyData = [];
	async function loadGraph(){
        console.log("Fetching renewable sources stats...");	
		const res = await fetch("https://imdb8.p.rapidapi.com/auto-complete", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "imdb8.p.rapidapi.com",
                "x-rapidapi-key": "bee22da770mshca8e164afe0ce89p1095f2jsn9e347459eff1"
            }
        }); 
        console.log(JSON.stringify(res,null,2));
		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
            pluginCycling = json;
            console.log(JSON.stringify(res,null,2));
			console.log("Received " +  pluginCycling.length + " renewable sources stats.");
		} else {
			console.log("ERROR!");
        }
    }
</script>
<svelte:head>
        <script src="https://canvasjs.com/assets/script/canvasjs.min.js" on:load="{loadGraph}"> </script>
    </svelte:head>
<main>
</main>