<section>
    <ol class="breadcrumb mb-2">
        <li class="crumb"><a class="anchor" href="/Containers">Containers</a></li>
        <li class="crumb-separator" aria-hidden>/</li>
        <li>{container.Name.substring(1)}</li>
    </ol>
    <div class="flex">
        <h1 class="h1">
            {container.Name.substring(1)}
        </h1>
        <div class="grow"></div>
        <div class="btn-group">
            <button on:click={() => {delContenidors(container)}} type="button" class="variant-soft-error p-1">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </span>
            </button>
            {#if servidor}
                <a href="http://{new URL(window.location.href).hostname}:8888/?hostname={servidor.ip}&port={servidor.port}&username={servidor.username}&password={getBase64Pass(servidor.pass)}&command=docker%20attach%20{id}" target="_blank" type="button" class="variant-soft-tertiary p-1">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-database-fill-gear" viewBox="0 0 16 16">
                            <path d="M8 1c-1.573 0-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4s.875 1.755 1.904 2.223C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777C13.125 5.755 14 5.007 14 4s-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1"/>
                            <path d="M2 7v-.839c.457.432 1.004.751 1.49.972C4.722 7.693 6.318 8 8 8s3.278-.307 4.51-.867c.486-.22 1.033-.54 1.49-.972V7c0 .424-.155.802-.411 1.133a4.51 4.51 0 0 0-4.815 1.843A12 12 0 0 1 8 10c-1.573 0-3.022-.289-4.096-.777C2.875 8.755 2 8.007 2 7m6.257 3.998L8 11c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13h.027a4.55 4.55 0 0 1 .23-2.002m-.002 3L8 14c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-1.3-1.905m3.631-4.538c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                          </svg>
                    </span>
                </a>
                <a href="http://{new URL(window.location.href).hostname}:8888/?hostname={servidor.ip}&port={servidor.port}&username={servidor.username}&password={getBase64Pass(servidor.pass)}&command=docker%20exec%20-it%20{id}%20/bin/bash" target="_blank" type="button" class="variant-soft-secondary p-1">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-terminal" viewBox="0 0 16 16">
                            <path d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9M3.854 4.146a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708z"/>
                            <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
                        </svg>
                    </span>
                </a>
            {/if}
            {#if container.State.Running}
                <button on:click={() => {stopContainer()}} type="button" class="variant-soft-primary p-1">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-stop-fill" viewBox="0 0 16 16">
                            <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5"/>
                        </svg>
                    </span>
                </button>
            {:else}
                <button on:click={() => {runContainer()}} type="button" class="variant-soft-primary p-1">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                        </svg>
                    </span>
                </button>
            {/if}
        </div>
    </div>
    <div class="mb-1 flex p-2 pl-0" style="{obtenerColorEstat(container.State.Status)}">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-circle-fill mr-1 mt-1" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8"/>
        </svg>
        {container.State.Status}
    </div>
    <TabGroup>
        <Tab bind:group={tabSet} name="tab2" value={1}>Logs</Tab>
        <Tab bind:group={tabSet} name="tab1" value={0}>
            <span>Files</span>
        </Tab>
        <Tab bind:group={tabSet} name="tab3" value={2}>Stats</Tab>
        <!-- Tab Panels --->
        <svelte:fragment slot="panel">
            <div class="overflow-auto h-full">
            {#if tabSet === 0}
                <RecursiveTreeView on:click={mostraFile} nodes={fitxers} padding={'py-1 px-1 pl-2'}/>
                {#if !carregant}
                    {#if !container.State.Running}
                        <div class="variant-ghost-error flex p-4 rounded">
                            <!-- Icon -->
                            <div class="mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                                </svg>
                            </div>
                            <!-- Message -->
                            <div class="">
                                <h3 class="h3">Error</h3>
                                <p>The docker container have to be running in order to view the files</p>
                            </div>
                            <!-- Actions -->
                        </div>
                    {:else}
                        {#if errorDrets }
                            <div class="variant-ghost-error flex p-4 rounded">
                                <!-- Icon -->
                                <div class="mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                                    </svg>
                                </div>
                                <!-- Message -->
                                <div class="">
                                    <h3 class="h3">Error</h3>
                                    <p>The docker user dont have permision to check the files</p>
                                </div>
                                <!-- Actions -->
                            </div>
                        {/if}
                    {/if}
                {/if}
            {:else if tabSet === 1}
            <div class="card p-4" style="font-size: 15px;" bind:innerText={logs} contenteditable="false">
            </div>
            {:else if tabSet === 2}
                <div style="--json-tree-string-color: #42a5f5; /* Azul */
                --json-tree-symbol-color: #42a5f5; /* Azul */
                --json-tree-boolean-color: #42a5f5; /* Verde */
                --json-tree-function-color: #42a5f5; /* Verde */
                --json-tree-number-color: #42a5f5; /* Naranja */
                --json-tree-label-color: #ffffff; /* Morado */
                --json-tree-property-color: #ffffff; /* Negro */
                --json-tree-arrow-color: #727272; /* Gris */
                --json-tree-operator-color: #42a5f5; /* Gris */
                --json-tree-null-color: #42a5f5; /* Gris */
                --json-tree-undefined-color: #42a5f5; /* Gris */
                --json-tree-date-color: #42a5f5; /* Gris */
                --json-tree-internal-color: #42a5f5; /* Gris */
                --json-tree-regex-color: #42a5f5;
                --json-tree-font-size: 18px;
                --json-tree-font-family: Inter, system-ui, sans-serif;
                --json-tree-li-indentation: 1em;
                --json-tree-li-line-height: 1.6;">
                    <JSONTree value={container} />
                </div>
            {/if}
            </div>
        </svelte:fragment>
    </TabGroup>
			

    <!--  -t -o "RemoteCommand=docker exec -it 5563bfef8234 bash"  -->
    <br>

</section>

<script>
	import { onDestroy, onMount } from "svelte";
    import { pb } from "../../../../pocketbase";
    import { servidorActual } from '../../../../stores';
    import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
    import { TreeView, TreeViewItem, RecursiveTreeView } from '@skeletonlabs/skeleton';
    import { Toast, getToastStore } from '@skeletonlabs/skeleton';
    import JSONTree from 'svelte-json-tree';
    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    
    const modalStore = getModalStore();

    let directoriObert = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16"><path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"/></svg>'
    let directoriTencat = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-fill" viewBox="0 0 16 16"><path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z"/></svg>'
    let fitxer = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file" viewBox="0 0 16 16"><path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1"/></svg>'
  
    const toastStore = getToastStore();

    let servidor;
	const unsubscribe = servidorActual.subscribe(value => {
		servidor = value;
	});

    let tabSet = 1;

    let unicId = 0;
    function getUnicId(){
        return unicId++;
    }


    let container = {Name: "", State: {Running: false}}
    let logs
    let id
    let errorDrets = false;
    let carregant;

    let intervalId
    onMount(() => {
        const ruta = window.location.href;
        const partes = ruta.split("/");
        id = partes[partes.length - 1];
        carregant = true;
        carregarContenidor()
        carregarFiles()
        carregarLogs()
        intervalId = setInterval(() => {
			if (servidor) carregarContenidor(servidor)
			if (servidor) carregarLogs(servidor)
		}, 5000);
    })

    onDestroy(() => {
        clearInterval(intervalId);
    })

    $: carregarContenidor(servidor)
    function carregarContenidor(ser) {
        if (servidor && id){
			pb.send("/functions/" + servidor.id + "/container/" + id + "/inspect", {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((resultat) => {
                try {
                    container = JSON.parse(resultat)[0]
                    console.log(container)
                } catch (error) {
                    console.log(error)
                }
                carregant = false;
			}).catch((error) => {
                console.log(error)
                carregant = false;
			});
		}
    }

    $: carregarLogs(servidor)
    function carregarLogs(ser) {
        if (servidor && id){
            const fechaActual = new Date();
            const fechaHaceUnaSemana = new Date(fechaActual.getTime() - (7 * 24 * 60 * 60 * 1000));

			pb.send("/functions/" + servidor.id + "/container/" + id + "/logs/" + fechaHaceUnaSemana.toISOString(), {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((resultat) => {
                logs = resultat//.replace("\n", "</br>")
			}).catch((error) => {
                console.log(error)
			});
		}
    }


    let fitxers = []

    function createObjectsFromPath(path, id) {
        const parts = path.split('/').filter(part => part !== '');
        if (parts.length === 0) return null;
        const obj = { content: parts[0], children: [], id: id };

        return obj;
    }

    $: carregarFiles(servidor)
    function carregarFiles(serv) {
        if (servidor && id){
            console.log("list");
			pb.send("/functions/" + servidor.id + "/container/" + id + "/list", {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((resultat) => {
				try {
                    let test = ""
                    const lineas = resultat.split('\n');
                    const root = { id: "root", content: 'root', children: []}
                    // Recorrer cada línea
                    lineas.forEach(linea => {
                        let nombre = linea.trim()
                        const parts = nombre.split('/');
                        let current = root;
                        for (let i = 0; i < parts.length; i++) {
                            const existingChild = current.children.find(child => child.content === parts[i]);
                            if (existingChild) {
                                current = existingChild;
                            } else {
                                const newChild = createObjectsFromPath(parts.slice(i).join('/'), nombre);
                                current.children.push(newChild);
                                break;
                            }
                        }

                    });
                    console.log(root.children[0].children)
                    if (root.children[0].children) {
                        fitxers = root.children[0].children
                    }
                    errorDrets = false;
				} catch (error) {
					console.error("Error al parsear JSON:", error);
				}
			}).catch((error, test) => {
                errorDrets = true
                fitxers = []
			});
		}
    }

    function mostraFile(fitxer) {
        console.log(fitxer)
        if (servidor && id){
			pb.send("/functions/" + servidor.id + "/container/" + id + "/file/" + fitxer.detail.id, {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((resultat) => {
                    // Data
                    // title: fitxer.detail.id.split("/").pop(),
                    // body: resultat.replaceAll("\n", '</br>'),
                
                const modal = {
                    type: 'component',
                    component: 'fileView',
                    meta: {
                        nom: fitxer.detail.id.split("/").pop(),
                        content: resultat.replaceAll("\n", '</br>'),
                    }
                };
                modalStore.trigger(modal);
                console.log(resultat)
			}).catch((error) => {
                console.log(error)
			});
		}
    }

    function runContainer(container) {
		if (servidor){
			pb.send("/functions/" + servidor.id + "/container/" + id + "/start", {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((llista) => {
                const t = {
                    background: 'variant-soft-success',
                    hideDismiss: true,
                    message: 'Docker container running',
                    timeout: 2000
                };
                toastStore.trigger(t);
                carregarContenidor()
                carregarFiles()
                carregarLogs()
			}).catch(() => {
                const t = {
                    background: 'variant-soft-error',
                    hideDismiss: true,
                    message: 'Error running docker container',
                    timeout: 2000
                };
                toastStore.trigger(t);
			});
		}
	}

	function stopContainer(container) {
		if (servidor){
			pb.send("/functions/" + servidor.id + "/container/" + id + "/stop", {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((llista) => {
                const t = {
                    background: 'variant-soft-success',
                    hideDismiss: true,
                    message: 'Docker container stoped',
                    timeout: 2000
                };
                toastStore.trigger(t);
                carregarContenidor()
                carregarFiles()
                carregarLogs()
			}).catch(() => {
                const t = {
                    background: 'variant-soft-error',
                    hideDismiss: true,
                    message: 'Error stoping docker container',
                    timeout: 2000
                };
                toastStore.trigger(t);
			});
		}
	}

    function delContenidors(cont) {
		if (servidor){
			pb.send("/functions/" + servidor.id + "/container/" + cont.Id + "/remove", {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((llista) => {
				console.log(cont)
                goto("/Containers")
				const t = {
                    background: 'variant-filled-success',
                    hideDismiss: true,
                    message: 'Container removed correctly',
                    timeout: 2000
                };
                toastStore.trigger(t);
			}).catch(() => {
				const t = {
                    background: 'variant-filled-error',
                    hideDismiss: true,
                    message: 'Error, cannot remove contaier',
                    timeout: 2000
                };
                toastStore.trigger(t);
			});
		}
	}

    function obtenerColorEstat(estat) {
		var final = "--color-surface-300";
		if (estat === 'created') {
			final = '--color-surface-300';
		} else if (estat === 'running') {
			final = '--color-success-400';
		} else if (estat === 'restarting' || estat === 'paused' ) {
			final = '--color-warning-500';
		} else if (estat === 'exited') {
			final = '--color-surface-300';
		} else if (estat === 'dead') {
			final = '--color-error-500';
		}
		return "color: rgba(var(" + final + ") / 1);"
	}

    function getBase64Pass(pass) {
        try {
            return btoa(pass)
        } catch (error) {
            return "err"
        }
    }
  //-t -o "RemoteCommand=docker exec -it 5563bfef8234 bash"

</script>