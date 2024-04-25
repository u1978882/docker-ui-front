<script>
	import '../app.postcss';
	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	import { initializeStores, Drawer } from '@skeletonlabs/skeleton';
	initializeStores();

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { getDrawerStore } from "@skeletonlabs/skeleton";
	import ModalServers from '../components/modalServers.svelte';
	const drawerStore = getDrawerStore();

	import { servidorActual, setServidorActual } from '../stores.js';
	import PocketBase from 'pocketbase';
	import { onMount } from "svelte";
	import { setServers, servers } from "../stores.js";

	let servidor;
	const unsubscribe = servidorActual.subscribe(value => {
		servidor = value;
	});

	let servidors;
	const unsubscribeServers = servers.subscribe(value => {
		servidors = value;
	});


	const drawerSettings = {
		id: 'servers',
		// Provide your property overrides:
		width: 'w-[220px] md:w-[480px]',
		padding: 'p-4',
		rounded: 'rounded-xl',
	};

	const pb = new PocketBase('http://127.0.0.1:8090');

	onMount(() => {
		if(!servidor){
			drawerStore.open(drawerSettings);
		}
		pb.collection('server').getFullList({
			sort: '-created',
		}).then((rec) => {
			setServers(rec);

			console.log(servidors);
		});

		pb.collection('server').subscribe('*', function (e) {
			console.log(e.action);
			console.log(e.record);
			let servidorsCopia = servidors;
			if (e.action == "create") {
				servidorsCopia.push(e.record);
			} else if (e.action == "update"){
				const index = servidorsCopia.findIndex(server => server.id === e.record.id);
				servidorsCopia[index] = e.record;
			}else {
				servidorsCopia = servidorsCopia.filter(server => server.id !== e.record.id);
			}
			setServers(servidorsCopia);
		});
	})

</script>


<div class="container h-full mx-auto">

	{#if servidor}
		<h1 class="h1">{servidor.name}</h1>
	{/if}

	
	<button on:click={() => {drawerStore.open(drawerSettings);}} type="button" class="btn variant-filled-primary">
		<span>Open</span>
	</button>

	
	<nav class="list-nav">
		<!-- (optionally you can provide a label here) -->
		<ul>
			<li>
				<a href="/Containers">
					<span class="flex-auto">Containers</span>
				</a>
			</li>
			<li>
				<a href="/Images">
					<span class="flex-auto">Images</span>
				</a>
			</li>
			<li>
				<a href="/Volumes">
					<span class="flex-auto">Volumes</span>
				</a>
			</li>
		</ul>
	</nav>

</div>

<slot />
<Drawer>
	{#if $drawerStore.id === 'servers'}
		<ModalServers />
	{/if}
</Drawer>
