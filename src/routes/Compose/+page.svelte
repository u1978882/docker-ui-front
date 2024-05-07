<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<section>
	<ol class="breadcrumb mb-2">
        <li>Compose</li>
    </ol>
	<h1 class="h1 mb-2">
		Docker Compose
	</h1>
	<div class="flex p-2">
		<input bind:value={valorFiltre} class="input variant-form-material w-64" />
		<div class="flex-auto">
		</div>
		<button on:click={() => {llistaComposes(servidor)}} type="button" style="width:50px;" class="btn variant-filled-primary p-2">
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

	<!-- Responsive Container (recommended) -->
	<div class="table-container">
		<!-- Native Table Element -->
		<table class="table table-hover table-interactive">
			<thead>
				<tr>
					<th>Name</th>
					<th>Created</th>
					<th>Updated</th>
					<th style="text-align: center;">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each list as row}
					{#if row.name.toLowerCase().includes(valorFiltre.toLowerCase())}
						<tr>
							<td on:click={() => {window.location.href = '/Compose/' + row.id}}>
								<div class="text-xl">
									{row.name}
								</div>
							</td>
							<td on:click={() => {window.location.href = '/Compose/' + row.id}}>
								<div class="flex flex-col text-left">
									<div class="font-bold">
										{formateData(row.created)}
									</div>
									<div class="text-sm/[14px] text-surface-200">
										{formateHour(row.created)}
									</div>
								</div>
							</td>
							<td on:click={() => {window.location.href = '/Compose/' + row.id}}>
								<div class="flex flex-col text-left">
									<div class="font-bold">
										{formateData(row.updated)}
									</div>
									<div class="text-sm/[14px] text-surface-200">
										{formateHour(row.updated)}
									</div>
								</div>
							</td >
							<td on:click={() => {window.location.href = '/Containers'}} style="text-align: center;">
								<button on:click={() => {}} type="button" class="btn-icon option tooltip">
									<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
										<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
									</svg>
									<div class="tooltiptext">
										Start container
									</div>
								</button>
							</td>
						</tr>
					{/if}
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
	import { ProgressRadial, filter } from '@skeletonlabs/skeleton';
    import { DataHandler } from '@vincjo/datatables'
	import { getModalStore } from '@skeletonlabs/skeleton';
			
	const modalStore = getModalStore();

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

	const pb = new PocketBase('http://127.0.0.1:8090');


	onMount(() => {
		llistaComposes();
	})

	let list = [];
	let loading = false;
	$: llistaComposes(servidor);
	function llistaComposes(servidor) {
		if (servidor){
			loading = true;
			pb.collection('docker_compose').getFullList( {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((llista) => {
				loading = false;
				console.log(llista)
				list = llista;
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