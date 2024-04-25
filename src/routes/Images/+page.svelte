<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<section>
	<h1 class="h1">
		Images
	</h1>
	<button on:click={() => {llistaImatges()}} type="button" class="btn variant-filled-primary">
		<span>Llista Imatges</span>
	</button>
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

	function llistaImatges() {
		pb.send("/images/" + servidor.id, {
			// for all possible options check
			// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
		}).then((llista) => {
			console.log("llista", llista);
		});
	}

</script>