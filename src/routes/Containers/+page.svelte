<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<section>
	<ol class="breadcrumb mb-2">
        <li>Containers</li>
    </ol>
	<h1 class="h1 mb-2">
		Containers
	</h1>
	<div class="flex mb-2 mt-2">
		<input bind:value={valorFiltre} class="input variant-form-material w-64" />
		<div class="flex-auto">
		</div>
		<button on:click={() => {llistaContenidors(servidor)}} type="button" style="width:50px;" class="btn variant-soft-secondary p-2">
			{#if loading}
				<ProgressRadial width={'w-5'} value={undefined}/>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
					<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
				</svg>
			{/if}
		</button>
	</div>

	{#if !dockerDeamon}
		<div class="variant-ghost-error flex p-4 rounded">
			<!-- Icon -->
			<div class="mr-4">
				<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
					<path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
				</svg>
			</div>
			<!-- Message -->
			<div class="">
				<h3 class="h3">Error</h3>
				<p>The server dont have a running docker deamon</p>
			</div>
			<!-- Actions -->
		</div>
	{:else}
		<!-- Responsive Container (recommended) -->
		<div class="table-container">
			<!-- Native Table Element -->
			<table class="table table-hover table-interactive">
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
						{#if row.Names.toLowerCase().includes(valorFiltre.toLowerCase()) || row.Status.toLowerCase().includes(valorFiltre.toLowerCase()) || row.Ports.toLowerCase().includes(valorFiltre.toLowerCase())}
							<tr>
								<td on:click={goto("/Containers/View/" + row.ID)}>{row.Names}</td>
								<td on:click={goto("/Containers/View/" + row.ID)} style="{obtenerColorEstat(row.State)} width:300px;">
									<div class="flex">
										<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-circle-fill mr-1" viewBox="0 0 16 16">
											<circle cx="8" cy="8" r="8"/>
										</svg>
										{row.Status}
									</div>
								</td>
								<td on:click={goto("/Containers/View/" + row.ID)}>{row.Networks}</td>
								<td on:click={goto("/Containers/View/" + row.ID)} style="min-width:100px">
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
								<td on:click={goto("/Containers/View/" + row.ID)}>{row.RunningFor}</td>
								<td on:click={goto("/Containers/View/" + row.ID)}>{row.Size}</td>
								<td style="text-align: center; min-width:130px">
									<div class="card p-4 variant-filled-secondary" data-popup="popupHover">
										<p>Hover Content</p>
										<div class="arrow variant-filled-secondary" />
									</div>
									<div class="p-1">
										{#if row.State != "running"}
											<button on:click={() => {runContainer(row)}} type="button" class="btn-icon option tooltip">
												<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
													<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
												</svg>
											</button>
										{:else}
											<button on:click={() => {stopContainer(row)}} type="button" class="btn-icon option tooltip">
												<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-stop-fill" viewBox="0 0 16 16">
													<path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5"/>
												</svg>
											</button>
										{/if}
										<span class="divider-vertical h-6" />
										<button type="button" class="btn-icon option tooltip">
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
												<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
												<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
											</svg>
										</button>
									</div>
								</td>
							</tr>
						{/if}
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
	
	


</section>

<script>
	import { onDestroy, onMount } from "svelte";
	import { servidorActual } from '../../stores';
	import { ProgressRadial, filter } from '@skeletonlabs/skeleton';
    import { DataHandler } from '@vincjo/datatables'
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
    import { pb } from '../../pocketbase'
	import { goto } from '$app/navigation';

    const toastStore = getToastStore();

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

	let valorFiltre = "";

	function runContainer(container) {
		console.log("Running", container.ID)
		if (servidor){
			container.State = "restarting"
			container.Status = "Restarting..."
			list = list
			pb.send("/functions/" + servidor.id + "/container/" + container.ID + "/start", {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((llista) => {
				llistaContenidors(servidor);
			}).catch(() => {
				let objetoEncontrado = list.find(objeto => objeto.ID === container.ID);
				objetoEncontrado.State = "dead"
				objetoEncontrado.Status = "Exited..."
				list = list.map(objeto => {
					if (objeto.ID === container.ID) {
						return objetoEncontrado; // Reemplazar el objeto si tiene el id buscado
					} else {
						return objeto; // Mantener el objeto sin cambios
					}
				});

				const t = {
                    background: 'variant-soft-error',
                    hideDismiss: true,
                    message: 'Error running docker container',
                    timeout: 2000
                };
                toastStore.trigger(t);
				//list = [];
			});
		}
	}

	function stopContainer(container) {
		if (servidor){
			container.State = "paused"
			container.Status = "Stoping..."
			list = list
			pb.send("/functions/" + servidor.id + "/container/" + container.ID + "/stop", {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((llista) => {
				llistaContenidors(servidor);
			}).catch(() => {
				const t = {
                    background: 'variant-soft-error',
                    hideDismiss: true,
                    message: 'Error stoping docker container',
                    timeout: 2000
                };
                toastStore.trigger(t);
				//list = [];
			});
		}
	}


	let intervalId
	let dockerDeamon = true;
	onMount(() => {
		dockerDeamon = true;
		llistaContenidors();
		intervalId = setInterval(() => {
			if (servidor) llistaContenidors(servidor)
		}, 5000);
	})

	onDestroy(() => {
		clearInterval(intervalId);
	})

	$: servChange(servidor);
	function servChange(serv) {
		console.log("Swaping server")
		dockerDeamon = true;
		list = [];
	}

	let list = [];
	let loading = false;
	$: llistaContenidors(servidor);
	function llistaContenidors(serv) {
		if (servidor){
			pb.send("/functions/containers/" + servidor.id, {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((llista) => {
				dockerDeamon = true;
				try {
					var jsonObject = JSON.parse(llista);
					list = jsonObject.containers;
				} catch (error) {
					console.error("Error al parsear JSON:", error);
				}
			}).catch(() => {
				dockerDeamon = false;
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
		return "color: rgba(var(" + final + ") / 1);"
	}

	function convertirCadenaAArrayObjetos(cadena) {
		if (cadena == ""){
			return []
		}

		try {
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

		} catch (error) {
			return []
		}
		// Separar los elementos por coma y flecha


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

</style>