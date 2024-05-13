<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<section>
	<ol class="breadcrumb mb-2">
        <li>Volumes</li>
    </ol>
	<div class="flex mb-2">
		<div class="">
			<h1 class="h1 mb-2">
				Volumes
			</h1>
		</div>
		<div class="flex-auto"></div>
		<div class="">
			<button on:click={() => {llistaVolums(servidor)}} type="button" class="btn variant-soft-primary mb-4 p-2">
				{#if loading}
					<ProgressRadial width={'w-5'} value={undefined} />
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
						<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
					</svg>
				{/if}
			</button>
		</div>
	</div>

	
	<!-- Responsive Container (recommended) -->
	<div class="table-container">
		<!-- Native Table Element -->
		<table class="table table-hover" style="table-layout: fixed;">
			<thead>
				<tr>
					<th>Name</th>
					<th>Mountpoint</th>
					<th>Label</th>
					<th>Scope</th>
					<th>Size</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				{#each list as row, i}
					<tr>
						<td style="word-wrap:break-word">{row.Name}</td>
						<td style="word-wrap:break-word">
							{row.Mountpoint}
						</td>
						<td style="word-wrap:break-word">{row.Labels}</td>
						<td>{row.Scope}</td>
						<td>{row.Size}</td>
						<td>{row.Status}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>


</section>

<script>
	import { onMount } from "svelte";
	import { servidorActual } from '../../stores';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
    import { pb } from '../../pocketbase'
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
    import { page } from '$app/stores';
	const modalStore = getModalStore();
	const toastStore = getToastStore();

	let servidor;
	const unsubscribe = servidorActual.subscribe(value => {
		servidor = value;
	});

	onMount(() => {
		llistaVolums();
	})

	let list = [];
	let loading = false;
	$: llistaVolums(servidor);
	function llistaVolums(servidor) {
		if (servidor){
			list = [];
			loading = true;
			pb.send("/functions/volumes/" + servidor.id, {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((llista) => {
				loading = false;
				console.log(llista)
				try {
					var jsonObject = JSON.parse(llista);
					list = jsonObject.volumes;
					console.log("llista", jsonObject);
				} catch (error) {
					console.error("Error al parsear JSON:", error);
				}
			}).catch(() => {
				loading = false;
				list = [];
			});
		}
	}


</script>