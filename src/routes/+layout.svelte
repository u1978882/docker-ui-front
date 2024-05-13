<script>
	import '../app.postcss';
	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import yaml from 'highlight.js/lib/languages/yaml';
	import dockerfile from 'highlight.js/lib/languages/dockerfile';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { initializeStores, Drawer, Modal, Toast } from '@skeletonlabs/skeleton';
	import {page} from '$app/stores'
    import { pb } from '../pocketbase'
	import { goto } from '$app/navigation';

	initializeStores();

	export const ssr = false;

    
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

	onMount(() => {
		console.log($page.url.pathname);
		pb.collection('server').unsubscribe('*')

		pb.collection('server').getFullList({
			sort: '-created',
		}).then((rec) => {
			setServers(rec);
			if(rec.length == 0){
				modalStore.trigger({type: 'component',component: 'crearServidor'});
			}
			else
			{
				if (!servidor) {
					setServidorActual(rec[0]);
				}
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
	import fileView from '../components/fileView.svelte'
	import runImage from '../components/runImage.svelte'

	const modalRegistry = {
		// Set a unique modal ID, then pass the component reference
		crearServidor: { ref: formulariCrearServidor },
		fileView: { ref: fileView },
		runImage: { ref: runImage },

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
									<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-box" viewBox="0 0 16 16">
										<path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/>
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
									<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-box-fill" viewBox="0 0 16 16">
										<path fill-rule="evenodd" d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z"/>
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
									<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-hdd" viewBox="0 0 16 16">
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
									<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-boxes" viewBox="0 0 16 16">
										<path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z"/>
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

<Toast zIndex={'z-[1000]'} />

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