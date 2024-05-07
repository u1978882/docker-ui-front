<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<section>
	<ol class="breadcrumb mb-2">
        <li>Images</li>
    </ol>
	<h1 class="h1 mb-2">
		Images
	</h1>
	<button on:click={() => {llistaImatges(servidor)}} type="button" class="btn variant-filled-primary mb-4 p-2">
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
					<th>Repository</th>
					<th>Tag</th>
					<th>Image Id</th>
					<th>Created Since</th>
					<th>Size</th>
				</tr>
			</thead>
			<tbody>
				{#each list as row, i}
					<tr>
						<td>{row.Repository}</td>
						<td>{row.Tag}</td>
						<td>{row.ID}</td>
						<td>{row.CreatedSince}</td>
						<td>{row.Size}</td>
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
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	let servidor;
	const unsubscribe = servidorActual.subscribe(value => {
		servidor = value;
	});

	const pb = new PocketBase('http://127.0.0.1:8090');

	onMount(() => {
		llistaImatges();
	})

	let list = [];
	let loading = false;
	$: llistaImatges(servidor);
	function llistaImatges(servidor) {
		if (servidor){
			list = [];
			loading = true;
			pb.send("/functions/images/" + servidor.id, {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((llista) => {
				loading = false;
				console.log(llista)
				try {
					var jsonObject = JSON.parse(llista);
					list = jsonObject.images;
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