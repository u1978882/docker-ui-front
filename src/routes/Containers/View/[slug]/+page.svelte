<section>
    <ol class="breadcrumb mb-2">
        <li class="crumb"><a class="anchor" href="/Containers">Containers</a></li>
        <li class="crumb-separator" aria-hidden>/</li>
        <li>{container.name}</li>
    </ol>
    <div class="flex">
        <h1 class="h1">
            {container.name}
        </h1>
        <div class="grow"></div>
        <div class="btn-group">
            <button on:click={() => {}} type="button" class="variant-soft-error p-1">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </span>
            </button>
            {#if servidor}
                <a href="http://{new URL(window.location.href).hostname}:8888/?hostname={servidor.ip}&username={servidor.username}&password={getBase64Pass(servidor.pass)}&command=docker%20exec%20-it%20{id}%20/bin/bash" target="_blank" type="button" class="variant-soft-secondary p-1">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-terminal" viewBox="0 0 16 16">
                            <path d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9M3.854 4.146a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708z"/>
                            <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
                        </svg>
                    </span>
                </a>
            {/if}
            {#if container.status == "running"}
                <button on:click={() => {}} type="button" class="variant-soft-secondary p-1">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-stop-fill" viewBox="0 0 16 16">
                            <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5"/>
                        </svg>
                    </span>
                </button>
            {:else}
                <button on:click={() => {}} type="button" class="variant-soft-primary p-1">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                        </svg>
                    </span>
                </button>
            {/if}
        </div>
    </div>
        
    <TabGroup>
        <Tab bind:group={tabSet} name="tab1" value={0}>
            <span>Files</span>
        </Tab>
        <Tab bind:group={tabSet} name="tab2" value={1}>Logs</Tab>
        <Tab bind:group={tabSet} name="tab3" value={2}>Stats</Tab>
        <!-- Tab Panels --->
        <svelte:fragment slot="panel">
            {#if tabSet === 0}
                <RecursiveTreeView nodes={fitxers} />
                {#if errorDrets }
                    <aside class="alert variant-ghost-error">
                        <!-- Icon -->
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                              </svg>
                        </div>
                        <!-- Message -->
                        <div class="alert-message">
                            <h3 class="h3">Error</h3>
                            <p>The docker user dont have permision to check the files</p>
                        </div>
                        <!-- Actions -->
                    </aside>
                {/if}
            {:else if tabSet === 1}
                (tab panel 2 contents)
            {:else if tabSet === 2}
                (tab panel 3 contents)
            {/if}
        </svelte:fragment>
    </TabGroup>
			

    <!--  -t -o "RemoteCommand=docker exec -it 5563bfef8234 bash"  -->
    <br>

</section>

<script>
	import { onMount } from "svelte";
    import { pb } from "../../../../pocketbase";
    import { servidorActual } from '../../../../stores';
    import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
    import { TreeView, TreeViewItem, RecursiveTreeView } from '@skeletonlabs/skeleton';
    import { Toast, getToastStore } from '@skeletonlabs/skeleton';

    
    let directoriObert = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16"><path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"/></svg>'
    let directoriTencat = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-fill" viewBox="0 0 16 16"><path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z"/></svg>'
    let fitxer = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file" viewBox="0 0 16 16"><path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1"/></svg>'
  
    const toastStore = getToastStore();

    let servidor;
	const unsubscribe = servidorActual.subscribe(value => {
		servidor = value;
	});

    let tabSet = 0;

    let unicId = 0;
    function getUnicId(){
        return unicId++;
    }


    let container = {name: ""}

    let id
    let errorDrets = false;

    onMount(() => {
        const ruta = window.location.href;
        const partes = ruta.split("/");
        id = partes[partes.length - 1];
        errorDrets = false;
        carregarFiles()
        carregarContenidor()
    })

    function carregarContenidor() {

    }

    let fitxers = []

    function createObjectsFromPath(path) {
        const parts = path.split('/').filter(part => part !== '');
        if (parts.length === 0) return null;

        const obj = { content: parts[0], children: [], id: getUnicId() };
        let current = obj;

        for (let i = 1; i < parts.length; i++) {
            const child = { content: parts[i], children: [], id: getUnicId()};
            current.children.push(child);
            current = child;
        }

        return obj;
    }

    $: carregarFiles(servidor)
    function carregarFiles(serv) {
        if (servidor){
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
                        // Dividir la línea en partes
                        const partes = linea.trim().split(/\s+/);
                        let nombre = partes.pop(); // Sacar el último elemento que es el nombre
                        const tamaño = partes.pop(); // Sacar el penúltimo elemento que es el tamaño

                        // Reunir el resto de las partes en permisos, usuario, grupo y fecha
                        const resto = partes.join(' ');
                        const [permisos, usuario, grupo, fecha] = resto.split(/\s+/);

                        // Crear el objeto y agregarlo al array
                        if (usuario) {
                            // permisos, usuario, grupo, tamaño, fecha, nombre
                            nombre = nombre.trim()
                            
                            const parts = nombre.split('/');
                            let current = root;
                            for (let i = 0; i < parts.length; i++) {
                                const existingChild = current.children.find(child => child.content === parts[i]);
                                if (existingChild) {
                                    current = existingChild;
                                } else {
                                    const newChild = createObjectsFromPath(parts.slice(i).join('/'));
                                    current.children.push(newChild);
                                    break;
                                }
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
			});
		}
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