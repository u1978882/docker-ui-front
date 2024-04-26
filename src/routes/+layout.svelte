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


<div class="main-container">

	<div class="sidebar bg-surface-700">
		<nav class="list-nav">

			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			{#if servidor}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<h1 on:click={() => {drawerStore.open(drawerSettings)}} class="h1 m-2 clikable">{servidor.name}</h1>
			{/if}
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

	<div class="content bg-surface-500">
		<slot />
	</div>
</div>

<Drawer>
	{#if $drawerStore.id === 'servers'}
		<ModalServers />
	{/if}
</Drawer>

<style>
	.main-container{
		display: flex;
	}
	.content {
		flex: 1;
		padding: 10px;
	}
	.sidebar {
		width: 400px;
		padding: 10px;
		height: 100vh;
	}
</style>