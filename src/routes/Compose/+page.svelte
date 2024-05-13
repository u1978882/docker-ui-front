<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<section>
	<ol class="breadcrumb mb-2">
        <li>Compose</li>
    </ol>
	<h1 class="h1 mb-2">
		Docker Compose
	</h1>
	<div class="flex pt-2 pb-2">
		<input bind:value={valorFiltre} class="input variant-form-material w-64" />
		<div class="flex-auto">
		</div>
		<button on:click={() => {goto("/Compose/New")}} type="button" class="btn variant-soft-primary">
			<span>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
				  </svg>
			</span>
			<span>New</span>
		</button>
	</div>

	<!-- Responsive Container (recommended) -->
	<div class="table-container">
		<!-- Native Table Element -->
		<table class="table table-hover table-interactive">
			<thead>
				<tr>
					<th>Name</th>
					<th style="text-align: center;">Dockerfile</th>
					<th>Created</th>
					<th>Updated</th>
					<th style="text-align: center;">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#if loading}
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
				{:else}	
					{#each list as row (row)}
						{#if row.name.toLowerCase().includes(valorFiltre.toLowerCase())}
							<tr>
								<td on:click={() => {goto('/Compose/View/' + row.id)}}>
									<div class="text-xl">
										{row.name}
									</div>
								</td>
								<td style="text-align: center;" on:click={() => {goto('/Compose/View/' + row.id)}}>
									<div>
										{row.dockerfile ? "Yes" : "No"}
									</div>
								</td>
								<td on:click={() => {goto('/Compose/View/' + row.id)}}>
									<div class="flex flex-col text-left">
										<div class="font-bold">
											{formateData(row.created)}
										</div>
										<div class="text-sm/[14px] text-surface-200">
											{formateHour(row.created)}
										</div>
									</div>
								</td>
								<td on:click={() => {goto('/Compose/View/' + row.id)}}>
									<div class="flex flex-col text-left">
										<div class="font-bold">
											{formateData(row.updated)}
										</div>
										<div class="text-sm/[14px] text-surface-200">
											{formateHour(row.updated)}
										</div>
									</div>
								</td >
								<td style="text-align: center;">
									<button on:click={() => {runCompose(row.id)}} type="button" class="btn-icon option tooltip">
										<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
											<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
										</svg>
									</button>
									<button on:click={() => {downDockerCompose(row.id)}} type="button" class="btn-icon option tooltip">
										<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-stop-fill" viewBox="0 0 16 16">
											<path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5"/>
										  </svg>
									</button>
									<span class="divider-vertical" style="height: 25px;" />
									<button on:click={() => {delDockerCompose(row.id)}} type="button" class="btn-icon option tooltip">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
											<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
											<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
										</svg>
									</button>
								</td>
							</tr>
						{/if}					
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</section>

<script>
	import { onMount } from "svelte";
	import { servidorActual } from '../../stores';
	import { ProgressRadial, filter } from '@skeletonlabs/skeleton';
    import { DataHandler } from '@vincjo/datatables'
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { pb } from '../../pocketbase'
	import { goto } from '$app/navigation';
    import { page } from '$app/stores';

	const modalStore = getModalStore();
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

	onMount(() => {
		llistaComposes();
	})

	let list = [];
	let loading = true;
	$: llistaComposes(servidor);
	function llistaComposes(servidor) {
		if (servidor){
			loading = true;
			pb.collection('docker_compose').unsubscribe('*')
			pb.collection('docker_compose').getFullList( {
				filter: 'server.id="' + servidor.id + '"',
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((llista) => {
				loading = false;
				console.log(llista)
				list = llista;
				pb.collection('docker_compose').subscribe('*', function (e) {
					if(e.record.server == servidor.id){
						if (e.action == "create") {
							list.push(e.record);
						} else if (e.action == "update"){
							const index = list.findIndex(compose => compose.id === e.record.id);
							list[index] = e.record;
						}else {
							list = list.filter(compose => compose.id !== e.record.id);
							console.log(e.record)
						}
						list = list;
					}
				})
			}).catch(() => {
				loading = false;
				list = [];
			});

		}
	}


	function formateHour(originalDate) {
		const dateObj = new Date(originalDate);
		const hours = dateObj.getHours();
		const minutes = dateObj.getMinutes();
		const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
		const period = hours < 12 ? 'AM' : 'PM';
		const formattedDate = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
		return formattedDate;
	}

	function formateData(originalDate) {
		const dateObj = new Date(originalDate);
		const day = dateObj.getDate();
		const month = dateObj.getMonth() + 1;
		const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${dateObj.getFullYear()}`;
		return formattedDate;
	}

	function delDockerCompose(id) {
		const t = {
			background: 'variant-filled-success',
			hideDismiss: true,
			message: 'Deleting docker compose',
			timeout: 6000
		};
		toastStore.trigger(t);
        pb.collection('docker_compose').delete(id)
        .then((record) => {
			const t = {
                background: 'variant-filled-success',
				hideDismiss: true,
                message: 'Docker compose deleted successfully',
                timeout: 6000
            };
            toastStore.trigger(t);
        }).catch(() => {
            const t = {
                background: 'variant-filled-error',
				hideDismiss: true,
                message: 'Cannot delete docker compose',
                timeout: 6000
            };
            toastStore.trigger(t);
        });
    }

	function runCompose(compose) {
		if (servidor){
			const t = {
				background: 'variant-filled-success',
				hideDismiss: true,
				message: 'Starting docker compose',
				timeout: 6000
			};
			toastStore.trigger(t);
			pb.send("/functions/" + servidor.id + "/dockercompose/" + compose + "/up", {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((resultat) => {
				try {
					console.log(resultat);
					var jsonObject = JSON.parse(resultat);
					if (jsonObject.stat == "ok") goto("/Containers")
					else {
						const t = {
							background: 'variant-filled-error',
							hideDismiss: true,
							message: 'Cannot start docker compose: ' + jsonObject.resultat,
							timeout: 6000
						};
						toastStore.trigger(t);
					}
				} catch (error) {
					console.error("Error al parsear JSON:", error);
				}
			}).catch((error, test) => {
				console.log(test)
			});
		}
	}

	function downDockerCompose(compose) {
		if (servidor){
			const t = {
				background: 'variant-filled-success',
				message: 'Downing docker compose',
				hideDismiss: true,
				timeout: 6000
			};
			toastStore.trigger(t);
			pb.send("/functions/" + servidor.id + "/dockercompose/" + compose + "/down", {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((resultat) => {
				try {
					console.log(resultat);
					var jsonObject = JSON.parse(resultat);
					if (jsonObject.stat == "ok") goto("/Containers")
					else {
						const t = {
							background: 'variant-filled-error',
							hideDismiss: true,
							message: 'Cannot down docker compose: ' + jsonObject.resultat,
							timeout: 6000
						};
						toastStore.trigger(t);
					}
				} catch (error) {
					console.error("Error al parsear JSON:", error);
				}
			}).catch((error, test) => {
				console.log(test)
			});
		}
	}

</script>

<style>

	td {
		vertical-align: middle;
	}

	.option:hover {
		background-color: rgba(var(--color-surface-700));
	}


</style>