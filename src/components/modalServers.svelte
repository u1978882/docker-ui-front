<section class="p-4">
    <nav class="list-nav">
        <h1 class="h1 mb-4 ml-4">Servidors</h1>
        <ul>
            {#each servidors as server (server)}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <li animate:flip>
                <!-- svelte-ignore missing-declaration -->
                <!-- svelte-ignore a11y-missing-attribute -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <a on:click={() => {setServidorActual(server); drawerStore.close()}} class={esServidorSeleccionat(server)}>
                    <span class="badge bg-primary-500 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hdd-network" viewBox="0 0 16 16">
                            <path d="M4.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M3 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8.5v3a1.5 1.5 0 0 1 1.5 1.5h5.5a.5.5 0 0 1 0 1H10A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5H.5a.5.5 0 0 1 0-1H6A1.5 1.5 0 0 1 7.5 10V7H2a2 2 0 0 1-2-2zm1 0v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1m6 7.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5"/>
                        </svg>
                    </span>
                    <span class="flex-auto">
                        <dt class="font-bold">{server.name}</dt>
                        <dd class="text-sm opacity-50">{server.ip}</dd>
                    </span>
                </a>
            </li>
            {/each}
        </ul>
    </nav>
</section>

<script>
    import { flip } from 'svelte/animate';
    import { servidorActual, setServidorActual, servers } from '../stores.js';
	import { getDrawerStore } from "@skeletonlabs/skeleton";
	const drawerStore = getDrawerStore();

    let servidor;
    const unsubscribeServidorActual = servidorActual.subscribe(value => {
        servidor = value;
    });

    let servidors;
    const unsubscribeServidors = servers.subscribe(value => {
        servidors = value;
    });

    function esServidorSeleccionat(server){
        if(servidor)
            return servidor.id == server.id ? 'bg-primary-900' : ''
        return "";
    }

</script>