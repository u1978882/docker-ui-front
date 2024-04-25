<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<section>
	<h1 class="h1">
		Images
	</h1>
	<button on:click={() => {llistaImatges()}} type="button" class="btn variant-filled-primary">
		<span>Llista Imatges</span>
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
					<th>created</th>
					<th>size</th>
				</tr>
			</thead>
			<tbody>
				{#each list as row, i}
					<tr>
						<td>{row.repository}</td>
						<td>{row.tag}</td>
						<td>{row.image_id}</td>
						<td>{row.created}</td>
						<td>{row.size}</td>
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

	let servidor;
	const unsubscribe = servidorActual.subscribe(value => {
		servidor = value;
	});

	const pb = new PocketBase('http://127.0.0.1:8090');

	onMount(() => {
		llistaImatges();
	})

	let list = [];

	function llistaImatges() {
		if (servidor){
			pb.send("/functions/images/" + servidor.id, {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((llista) => {
				console.log(llista)
				try {
					var jsonObject = JSON.parse(llista);
					list = jsonObject;
					console.log("llista", jsonObject);
				} catch (error) {
					console.error("Error al parsear JSON:", error);
				}
			});
		}
	}

</script>