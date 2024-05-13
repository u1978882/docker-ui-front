<section>
    <h1 class="h1">
        New Docker Compose
    </h1>
    <br>
    <form on:submit|preventDefault={createCompose}>
        <label class="label mb-3">
            <span>Name</span>
            <input bind:value={name} class="input variant-form-material" type="text" placeholder="Name" required/>
        </label>
        <span>Dockerfile</span>
        <br>
        <SlideToggle bind:checked={dockerFileToggle} name="slider-large" active="bg-primary-500" size="sm" />
        {#if dockerFileToggle}
            <label class="label mb-2" transition:slide>
                <textarea bind:value={dockerfile} class="textarea variant-form-material" rows="4" placeholder="Enter dockerfile." required/>
            </label>
        {/if}
        <hr class="m-2 mt-4 mb-4">
        <h2 class="h2 mb-4">
            Docker Compose
        </h2>
        <TabGroup>
            <Tab bind:group={tabSet} name="tab1" value={0}>
                <svelte:fragment slot="lead">
                </svelte:fragment>
                <span>Upload file</span>
            </Tab>
            <Tab bind:group={tabSet} name="tab2" value={1}>Manual edit</Tab>
            <!-- Tab Panels --->
            <svelte:fragment slot="panel">
                {#if tabSet === 0}
                    <div class="flex w-100 mb-2">
                        <div class="flex-auto mr-3 w-32">
                            
                            <FileDropzone bind:files={files} on:change={changeYaml} name="files" accept=".yml">
                                <svelte:fragment slot="lead">
                                    <div class="flex">
                                        <div class="flex-auto"></div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-filetype-yml" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM2.133 15.849v-1.535l1.339-2.464h-.856l-.855 1.696h-.032L.876 11.85H0l1.339 2.479v1.52zm2.287 0v-2.66h.038l.952 2.159h.516l.946-2.16h.038v2.661h.715V11.85h-.8l-1.14 2.596H5.66L4.52 11.85h-.805v3.999zm4.71-.674h1.696v.674H8.338V11.85h.791v3.325Z"/>
                                        </svg>
                                        <div class="flex-auto"></div>
                                    </div>
                                </svelte:fragment>
                                <svelte:fragment slot="message"> <bold>Upload a file</bold> or drag and drop </svelte:fragment>
                                <svelte:fragment slot="meta">Only YAML and YML files alowed</svelte:fragment>
                            </FileDropzone>
            
                        </div>
                        <div class="flex-auto ml-3 w-64">
                            <CodeBlock language="yaml" code={yaml}></CodeBlock>
                        </div>
                    </div>
                {:else if tabSet === 1}
                            
                    <label class="label">
                        <textarea bind:value={yaml} class="textarea variant-form-material code" rows="20" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
                    </label>
    
                {/if}
            </svelte:fragment>
        </TabGroup>
        <hr class="m-2 mt-4 mb-4">
        <h2 class="h2 mb-4">
            Description
        </h2>
        <div class="flex">
            <div class="flex-auto w-32 mr-3">
                <label class="label mb-2">
                    <span class="mb-2">Description</span>
                    <textarea bind:value={description} class="textarea variant-form-material code" rows="4" placeholder="Enter docker compose description."/>
                </label>
            </div>
            <div class="flex-auto w-64 ml-3">
                <div class="mb-2">Preview</div>
                <div class="card p-3">
                    <div bind:innerHTML={description} contenteditable="false"></div>
                </div>
            </div>
        </div>
        <hr class="m-2 mt-4 mb-4">
        <div class="flex">
            <div class="flex-auto"></div>
            <button on:click={() => {yaml = "\n"}} type="reset" class="btn variant-filled-secondary mr-3">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                      </svg>
                </span>
                <span>Reset</span>
            </button>
            <button type="submit" class="btn variant-filled-primary">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                      </svg>
                </span>
                <span>New</span>
            </button>
        </div>
    </form>
</section>

<script>
    import { SlideToggle } from '@skeletonlabs/skeleton';
	import { fade, scale, slide } from 'svelte/transition';
    import { CodeBlock } from '@skeletonlabs/skeleton';
    import { FileDropzone } from '@skeletonlabs/skeleton';
    import { Toast, getToastStore } from '@skeletonlabs/skeleton';
    import { servidorActual } from '../../../stores';
    import { pb } from '../../../pocketbase'
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';


    let servidor;
	const unsubscribe = servidorActual.subscribe(value => {
		servidor = value;
	});

    let tabSet = 0;

    const toastStore = getToastStore();

    const animate = (node, args) =>
		args.cond ? fade(node, args) : scale(node, args);

    let name, description, dockerFileToggle, dockerfile
    let yaml = "\n"
    let files;

    function changeYaml() {
        var reader = new FileReader();
        reader.readAsText(files[0], "UTF-8");
        reader.onload = function (evt) {
            yaml = evt.currentTarget.result;
            if (esYAMLValido(evt.currentTarget.result)){ yaml = evt.currentTarget.result }
            else toastYMLNoValid()
        }
        reader.onerror = function (evt) {toastYMLNoValid()}
    }

    function createCompose() {
        if (yaml == "\n") {
            const t = {
                background: 'variant-filled-error',
                hideDismiss: true,
                message: 'Need to input a valid YML File.',
                timeout: 2000
            };
            toastStore.trigger(t);
        } else {
            if (servidor) {
                const data = {
                    "name": name,
                    "server": servidor.id,
                    "content": yaml,
                    "dockerfile": dockerFileToggle ? dockerfile : "",
                    "description": description
                };
                pb.collection('docker_compose').create(data)
                .then((record) => {
                    goto("/Compose/View/" + record.id)
                    console.log("funca")
                }).catch((err) => {
                    const t = {
                        background: 'variant-filled-error',
                        hideDismiss: true,
                        message: 'Error creating docker compose',
                        timeout: 2000
                    };
                    toastStore.trigger(t);
                });
            }
        }
    }

    function toastYMLNoValid() {
        yaml = "\n"
        const t = {
            background: 'variant-filled-error',
            hideDismiss: true,
            message: 'YML File not valid',
            timeout: 2000
        };
        toastStore.trigger(t);
    }

    function esYAMLValido(cadena) {
        try {
            // Dividir la cadena en líneas
            const lineas = cadena.split('\n');

            // Verificar si hay al menos un par clave-valor o una lista
            let haEncontradoClaveValor = false;
            let haEncontradoLista = false;

            for (const linea of lineas) {
                const partes = linea.trim().split(':');

                // Si hay dos partes y la primera parte no está vacía, es un par clave-valor
                if (partes.length === 2 && partes[0] !== '') {
                    haEncontradoClaveValor = true;
                }

                // Si la línea contiene un '-' al principio, es una lista
                if (linea.trim().startsWith('-')) {
                    haEncontradoLista = true;
                }

                // Si se han encontrado ambos, se considera que es un YAML válido
                if (haEncontradoClaveValor && haEncontradoLista) {
                    return true;
                }
            }

            // Si no se encontró ningún par clave-valor ni lista, se considera que no es YAML válido
            return false;
        } catch (error) {
            // Si ocurre algún error, se considera que no es YAML válido
            return false;
        }
    }

</script>