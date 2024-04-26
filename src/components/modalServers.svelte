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
                <a class={esServidorSeleccionat(server) ? "bg-primary-900" : ""}>
                    <span on:click={() => {setServidorActual(server); drawerStore.close()}} class="badge bg-primary-500 p-2 {esServidorSeleccionat(server) ? "" : "variant-ghost"}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hdd-network" viewBox="0 0 16 16">
                            <path d="M4.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M3 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8.5v3a1.5 1.5 0 0 1 1.5 1.5h5.5a.5.5 0 0 1 0 1H10A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5H.5a.5.5 0 0 1 0-1H6A1.5 1.5 0 0 1 7.5 10V7H2a2 2 0 0 1-2-2zm1 0v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1m6 7.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5"/>
                        </svg>
                    </span>
                    <span on:click={() => {setServidorActual(server); drawerStore.close()}} class="flex-auto">
                        <dt class="font-bold">{server.name}</dt>
                        <dd class="text-sm opacity-50">{server.ip}</dd>
                    </span>
                    <span use:popup={{ event: 'click', target: 'dropServer-' + server.id, placement: 'bot' }} class="m-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                          </svg>
                    </span>
                    <div on:click={eliminarServidor(server.id)} class="card p-4 shadow-xl" data-popup="dropServer-{server.id}">
                        <button type="button" class="btn variant-filled-error">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                  </svg>
                            </span>
                            <span>Eliminar</span>
                        </button>
                    </div>
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
    import PocketBase from 'pocketbase';
	const drawerStore = getDrawerStore();
    import { popup } from '@skeletonlabs/skeleton';

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
            return servidor.id == server.id;
        return false
    }

    const popupFeatured = {
        // Represents the type of event that opens/closed the popup
        event: 'click',
        // Matches the data-popup value on your popup element
        target: 'popupFeatured',
        // Defines which side of your trigger the popup will appear
        placement: 'bottom',
    };

    function eliminarServidor(id) {
        const pb = new PocketBase('http://127.0.0.1:8090');
        pb.collection('server').delete(id);
    }

</script>