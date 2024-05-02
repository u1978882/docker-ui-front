<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<section>
	<h1 class="h1 mb-2">
		Containers
	</h1>
	<button on:click={() => {llistaContenidors(servidor)}} type="button" class="btn variant-filled-primary mb-4 p-2">
		{#if loading}
			<ProgressRadial width={'w-5'} value={undefined} />
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
				<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
				<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
			</svg>
		{/if}
	</button>

	
	<!-- Responsive Container (recommended) -->
	<div class="table-container">
		<!-- Native Table Element -->
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Name</th>
					<th>Status</th>
					<th>Networks</th>
					<th>Port</th>
					<th>Running for</th>
					<th>Size</th>
					<th style="text-align: center;">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each list as row}
					<tr>
						<td>{row.Names}</td>
						<td style={obtenerColorEstat(row.State)}>
							<div class="flex">
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-circle-fill mr-1" viewBox="0 0 16 16">
									<circle cx="8" cy="8" r="8"/>
								  </svg>
								{row.Status}
							</div>
						</td>
						<td>{row.Networks}</td>
						<td>
							{#each convertirCadenaAArrayObjetos(row.Ports) as port}
								<a class="flex" style="color: rgba(var(--color-primary-400));" href="{servidor ? "http://" + servidor.ip + ":" + port.portOrigen : ""}" target="_blank">
									{port.portOrigen}:{port.portDesti}
									<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-box-arrow-in-up-right ml-1 mt-1" viewBox="0 0 16 16">
										<path fill-rule="evenodd" d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5"/>
										<path fill-rule="evenodd" d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0z"/>
									  </svg>
								</a>
							{/each}
						</td>
						<td>{row.RunningFor}</td>
						<td>{row.Size}</td>
						<td style="text-align: center;">
							<div class="card p-4 variant-filled-secondary" data-popup="popupHover">
								<p>Hover Content</p>
								<div class="arrow variant-filled-secondary" />
							</div>
							<div class="p-1">
								{#if row.State != "running"}
									<button on:click={() => {runContainer(row.ID)}} type="button" class="btn-icon option tooltip">
										<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
											<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
										</svg>
										<div class="tooltiptext">
											Start container
										</div>
									</button>
								{:else}
									<button on:click={() => {stopContainer(row.ID)}} type="button" class="btn-icon option tooltip">
										<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-stop-fill" viewBox="0 0 16 16">
											<path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5"/>
										  </svg>
										  <div class="tooltiptext">
											Stop container
										</div>
									</button>
								{/if}
								<span class="divider-vertical h-6" />
								<button type="button" class="btn-icon option tooltip">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
										<path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
									  </svg>
									  <div class="tooltiptext p-1">
										Delete container
									</div>
								</button>
							</div>
						</td>
					</tr>
				{:else}
					<tr class="p-5">
						<td colspan="7" class="p-3">
							<section class="w-full">
								<div class="p-4 space-y-4">
									<div class="placeholder animate-pulse" />
									<div class="grid grid-cols-3 gap-8">
										<div class="placeholder animate-pulse" />
										<div class="placeholder animate-pulse" />
										<div class="placeholder animate-pulse" />
									</div>
									<div class="grid grid-cols-4 gap-4">
										<div class="placeholder animate-pulse" />
										<div class="placeholder animate-pulse" />
										<div class="placeholder animate-pulse" />
										<div class="placeholder animate-pulse" />
									</div>
								</div>
							</section>
						</td>
					</tr>	
				{/each}
			</tbody>
		</table>
	</div>


</section>

<script>
	import PocketBase from 'pocketbase';
	import { onMount } from "svelte";
	import { servidorActual } from '../../stores';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
    import { DataHandler } from '@vincjo/datatables'

	const handler = new DataHandler([], { rowsPerPage: 50 });
    let rows = handler.getRows();

	let servidor;
	const unsubscribe = servidorActual.subscribe(value => {
		servidor = value;
	});

	const popupOption = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};

	const pb = new PocketBase('http://127.0.0.1:8090');

	function runContainer(containerId) {
		console.log("Running", containerId)
		if (servidor){
			pb.send("/functions/" + servidor.id + "/container/" + containerId + "/start", {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((llista) => {
				llistaContenidors(servidor);
			}).catch(() => {
				loading = false;
				list = [];
			});
		}
	}

	function stopContainer(containerId) {
		if (servidor){
			pb.send("/functions/" + servidor.id + "/container/" + containerId + "/stop", {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((llista) => {
				llistaContenidors(servidor);
			}).catch(() => {
				loading = false;
				list = [];
			});
		}
	}



	onMount(() => {
		llistaContenidors();
	})

	let list = [];
	let loading = false;
	$: llistaContenidors(servidor);
	function llistaContenidors(servidor) {
		if (servidor){
			loading = true;
			pb.send("/functions/containers/" + servidor.id, {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((llista) => {
				loading = false;
				console.log(llista)
				try {
					var jsonObject = JSON.parse(llista);
					list = jsonObject.containers;
					console.log("llista", list);
				} catch (error) {
					console.error("Error al parsear JSON:", error);
				}
			}).catch(() => {
				loading = false;
				list = [];
			});
		}
	}


	function obtenerColorEstat(estat) {
		var final = "--color-surface-300";
		if (estat === 'created') {
			final = '--color-surface-300';
		} else if (estat === 'running') {
			final = '--color-success-400';
		} else if (estat === 'restarting' || estat === 'paused' ) {
			final = '--color-warning-500';
		} else if (estat === 'exited') {
			final = '--color-surface-300';
		} else if (estat === 'dead') {
			final = '--color-error-500';
		}
		console.log(final)
		return "color: rgba(var(" + final + ") / 1);"
	}

	function convertirCadenaAArrayObjetos(cadena) {
	if (cadena == ""){
		return []
	}
    // Separar los elementos por coma y flecha
    let elementos = cadena.split(', ');

    // Array para almacenar los objetos
    let arrayObjetos = [];

    // Iterar sobre cada elemento
    elementos.forEach(elemento => {
        // Separar el host y el contenedor por la flecha
        let partes = elemento.split('->');

        // Separar los puertos del host y el contenedor por el colon
        let puertoHost = parseInt(partes[0].split(':')[1]);
        let puertoContenedor = parseInt(partes[1].split(':')[0]);

        // Crear el objeto con los datos extraídos y agregarlo al array
        arrayObjetos.push({
            portOrigen: puertoHost,
            portDesti: puertoContenedor
        });
    });

    return arrayObjetos;
}

</script>

<style>
	a:hover svg {
		visibility: visible;
	}

	a svg {
		visibility: hidden;
	}
	td {
		vertical-align: middle;
	}

	.option:hover {
		background-color: rgba(var(--color-surface-700));
	}



	/* Tooltip text */
	.tooltiptext {
		visibility: hidden;
		width: 300px;
		background-color: rgba(var(--color-surface-700));
		color: #fff;
		text-align: center;
		padding: 5px;
		border-radius: 6px;
		
		/* Position the tooltip text - see examples below! */
		position: absolute;
		z-index: 1;
		width: 120px;
		bottom: 100%;
		left: 50%;
		margin-left: -60px;
	}

	/* Show the tooltip text when you mouse over the tooltip container */
	.tooltip:hover .tooltiptext {
		visibility: visible;
	}
</style>