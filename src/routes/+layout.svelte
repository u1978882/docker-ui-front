<script>
	import '../app.postcss';
	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import yaml from 'highlight.js/lib/languages/yaml';
	import dockerfile from 'highlight.js/lib/languages/dockerfile.js';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { initializeStores, Drawer, Modal } from '@skeletonlabs/skeleton';
	import {page} from '$app/stores'

	initializeStores();

    
    hljs.registerLanguage('yaml', yaml);
	hljs.registerLanguage('dockerfile', dockerfile);
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
	import { onMount, onDestroy } from "svelte";
	import { setServers, servers } from "../stores.js";

	import { getModalStore } from '@skeletonlabs/skeleton';
    const modalStore = getModalStore();


	

	let servidor;
	const unsubscribe = servidorActual.subscribe(value => {
		servidor = value;
	});

	let servidors;
	const unsubscribeServers = servers.subscribe(value => {
		servidors = value;
	});

	let acordion
	$: tencarAcordio(servidor)
	function tencarAcordio(servidor) {
		console.log("tencant acordio")
		acordion = false
	}


	const drawerSettings = {
		id: 'servers',
		// Provide your property overrides:
		width: 'w-[220px] md:w-[480px]',
		padding: 'p-4',
		rounded: 'rounded-xl',
	};

	const pb = new PocketBase('http://127.0.0.1:8090');

	onMount(() => {
		console.log($page.url.pathname);

		pb.collection('server').getFullList({
			sort: '-created',
		}).then((rec) => {
			setServers(rec);
			if(rec.length == 0){
				modalStore.trigger({type: 'component',component: 'crearServidor'});
			}
			else
			{
				setServidorActual(rec[0]);
			}
			console.log(servidors);
		});

		pb.collection('server').subscribe('*', function (e) {
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
			console.log(servidor)
		});

	})

	onDestroy(() => {
		pb.collection('server').unsubscribe('*');
	})

	import formulariCrearServidor from '../components/formulariCrearServidor.svelte'

	const modalRegistry = {
		// Set a unique modal ID, then pass the component reference
		crearServidor: { ref: formulariCrearServidor },

		// ...
	};

</script>


<div class="main-container">
	<div class="sidebar"></div>
	<div class="sidebar bg-surface-900 shadow-md real-sidebar">
		<div class="flex flex-col w-full h-full">
			<div class="flex-none">
				<nav class="list-nav">
					<ul>
						<li>
							<a href="/Containers" class={$page.url.pathname.includes("/Containers")  ? "bg-primary-900" : ""}>
								<span class="badge p-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box2-fill" viewBox="0 0 16 16">
										<path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4zM15 4.667V5H1v-.333L1.5 4h6V1h1v3h6z"/>
									  </svg>
								</span>
								<span class="flex-auto">
									<dt>Containers</dt>
								</span>
							</a>
						</li>
						<li>
							<a href="/Images" class={$page.url.pathname.includes("/Images") ? "bg-primary-900" : ""}>
								<span class="badge p-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box2" viewBox="0 0 16 16">
										<path d="M2.95.4a1 1 0 0 1 .8-.4h8.5a1 1 0 0 1 .8.4l2.85 3.8a.5.5 0 0 1 .1.3V15a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4.5a.5.5 0 0 1 .1-.3zM7.5 1H3.75L1.5 4h6zm1 0v3h6l-2.25-3zM15 5H1v10h14z"/>
									  </svg>
								</span>
								<span class="flex-auto">
									<dt>Imatges</dt>
								</span>
							</a>
						</li>
						<li>
							<a href="/Volumes" class={$page.url.pathname.includes("/Volumes") ? "bg-primary-900" : ""}>
								<span class="badge p-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hdd" viewBox="0 0 16 16">
										<path d="M4.5 11a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M3 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
										<path d="M16 11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V9.51c0-.418.105-.83.305-1.197l2.472-4.531A1.5 1.5 0 0 1 4.094 3h7.812a1.5 1.5 0 0 1 1.317.782l2.472 4.53c.2.368.305.78.305 1.198zM3.655 4.26 1.592 8.043Q1.79 8 2 8h12q.21 0 .408.042L12.345 4.26a.5.5 0 0 0-.439-.26H4.094a.5.5 0 0 0-.44.26zM1 10v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1"/>
									  </svg>
								</span>
								<span class="flex-auto">
									<dt>Volumes</dt>
								</span>
							</a>
						</li>
						<li>
							<a href="/Compose" class={$page.url.pathname.includes("/Compose") ? "bg-primary-900" : ""}>
								<span class="badge p-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backpack" viewBox="0 0 16 16">
										<path d="M4.04 7.43a4 4 0 0 1 7.92 0 .5.5 0 1 1-.99.14 3 3 0 0 0-5.94 0 .5.5 0 1 1-.99-.14M4 9.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm1 .5v3h6v-3h-1v.5a.5.5 0 0 1-1 0V10z"/>
										<path d="M6 2.341V2a2 2 0 1 1 4 0v.341c2.33.824 4 3.047 4 5.659v5.5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5V8a6 6 0 0 1 4-5.659M7 2v.083a6 6 0 0 1 2 0V2a1 1 0 0 0-2 0m1 1a5 5 0 0 0-5 5v5.5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5V8a5 5 0 0 0-5-5"/>
									  </svg>
								</span>
								<span class="flex-auto">
									<dt>Docker Compose</dt>
								</span>
							</a>
						</li>
					</ul>
				</nav>
			</div>
			<div class="grow">
			  
			</div>
			<div class="flex-none">
				<hr class="!border-t-1 mb-2" />
				<Accordion bind:open={acordion}>
					<AccordionItem>
						<svelte:fragment slot="lead">								
							<span class="badge bg-primary-500 p-2 variant-ghost">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-hdd-network" viewBox="0 0 16 16">
								<path d="M4.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M3 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
								<path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8.5v3a1.5 1.5 0 0 1 1.5 1.5h5.5a.5.5 0 0 1 0 1H10A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5H.5a.5.5 0 0 1 0-1H6A1.5 1.5 0 0 1 7.5 10V7H2a2 2 0 0 1-2-2zm1 0v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1m6 7.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5"/>
							</svg>
						</span>
						</svelte:fragment>
						<svelte:fragment slot="summary">
							<span class="flex-auto">
								{#if servidor}
									<h4 class="h4 font-bold">{servidor.name}</h4>
									<dd class="text-sm opacity-50">{servidor.ip}</dd>
								{:else}
									<h4 class="font-bold h4">Add a new server</h4>
								{/if}
							</span>
						</svelte:fragment>
						<svelte:fragment slot="content">
							<nav class="list-nav">
							<ModalServers/>
							</nav>
						</svelte:fragment>
					</AccordionItem>
				</Accordion>

			</div>
		  </div>
		
	</div>

	<div class="content p-5">
		<slot />
	</div>
</div>

<Drawer>
	{#if $drawerStore.id === 'servers'}
		<ModalServers />
	{/if}
</Drawer>

<Modal components={modalRegistry} />


<style>
	.main-container{
		display: flex;
	}
	.content {
		flex: 1;
	}
	.sidebar {
		width: 400px;
		padding: 10px;
		height: 100vh;
	}
	.real-sidebar {
		position: fixed;
	}
</style>