<section>
    {#if loading }
        <ol class="breadcrumb mb-2">
            <li class="crumb"><a class="anchor" href="/Compose">Compose</a></li>
            <li class="crumb-separator" aria-hidden>/</li>
            <li>
                <div class="placeholder animate-pulse" style="width: 150px;" />
            </li>
        </ol>
        <h1 class="h1 placeholder animate-pulse" style="width: 450px; height: 50px;">

        </h1>
        <br>
        <div class="placeholder animate-pulse mb-4" style="width: 150px;" />
        <div class="space-y-4">
            <div class="placeholder animate-pulse" />
            <div class="grid grid-cols-3 gap-8">
                <div class="placeholder animate-pulse" />
                <div class="placeholder animate-pulse" />
                <div class="placeholder animate-pulse" />
            </div>
            <div class="grid grid-cols-4 gap-4">
                <div class="placeholder animate-pulse" />
                <div class="placeholder animate-pulse" />
                <div class="placeholder animate-pulse" />
                <div class="placeholder animate-pulse" />
            </div>
        </div>
        <hr class="m-4">
        <section class="flex">
            <div class="flex-1 w-64 mr-2 h-full">
                <h2 class="h2 mb-2">
                    Docker Compose
                </h2>
                <div class="space-y-4">
                    <div class="placeholder animate-pulse" />
                    <div class="grid grid-cols-3 gap-8">
                        <div class="placeholder animate-pulse" />
                        <div class="placeholder animate-pulse" />
                        <div class="placeholder animate-pulse" />
                    </div>
                    <div class="grid grid-cols-4 gap-4">
                        <div class="placeholder animate-pulse" />
                        <div class="placeholder animate-pulse" />
                        <div class="placeholder animate-pulse" />
                        <div class="placeholder animate-pulse" />
                    </div>
                </div>
                <div class="placeholder animate-pulse mb-4 mt-4" style="width: 100%; height: 100px" />
                <div class="space-y-4">
                    <div class="placeholder animate-pulse" />
                    <div class="grid grid-cols-3 gap-8">
                        <div class="placeholder animate-pulse" />
                        <div class="placeholder animate-pulse" />
                        <div class="placeholder animate-pulse" />
                    </div>
                    <div class="grid grid-cols-4 gap-4">
                        <div class="placeholder animate-pulse" />
                        <div class="placeholder animate-pulse" />
                        <div class="placeholder animate-pulse" />
                        <div class="placeholder animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    {:else}
        <ol class="breadcrumb mb-2">
            <li class="crumb"><a class="anchor" href="/Compose">Compose</a></li>
            <li class="crumb-separator" aria-hidden>/</li>
            <li>{compose.name}</li>
        </ol>
        <div class="flex">
            <h1 class="h1">
                {compose.name}
            </h1>
            <div class="grow"></div>
            <div class="btn-group">
                <button on:click={() => {delDockerCompose()}} type="button" class="variant-soft-error p-1">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </span>
                </button>
                <button on:click={() => {downDockerCompose()}} type="button" class="variant-soft-secondary p-1">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-stop-fill" viewBox="0 0 16 16">
                            <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5"/>
                        </svg>
                    </span>
                </button>
                <button on:click={() => {runDockerCompose()}} type="button" class="variant-soft-primary p-1">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
        <br>
        <div class="remove-all p-2" bind:innerHTML={compose.description} contenteditable="false"></div>
        <hr class="m-4">
        <section class="flex">
            <div class="flex-1 w-64 mr-2 h-full">
                <h2 class="h2 mb-2">
                    Docker Compose
                </h2>
                <CodeBlock language="yaml" code={compose.content}></CodeBlock>
            </div>
            {#if compose.dockerfile }
                <div class="flex-1 ml-2 h-full">
                    <h2 class="h2 mb-2">
                        Dockerfile
                    </h2>
                    <CodeBlock language="dockerfile" code={compose.dockerfile}></CodeBlock>
                </div>
            {/if}
        </section>
    {/if}
</section>


<script>
    /** @type {import('./$types').PageData} */
	export let data;
    import { page } from '$app/stores';
    import { getModalStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
    import { Toast, getToastStore } from '@skeletonlabs/skeleton';
    import { storeHighlightJs } from '@skeletonlabs/skeleton';
    import { CodeBlock } from '@skeletonlabs/skeleton';
    import { pb } from '../../../../pocketbase'
	import { goto } from '$app/navigation';
    import { servidorActual } from '../../../../stores';

    let servidor;
	const unsubscribe = servidorActual.subscribe(value => {
		servidor = value;
	});

    let compose = {}
    let description
    let id
    let loading = true

    const toastStore = getToastStore();

    onMount(() => {
        loading = true
        console.log("Data", data)
        const ruta = window.location.href;
        const partes = ruta.split("/");
        id = partes[partes.length - 1];
        //console.log("Param", $page.data.q)
        getDockerCompose()
    })

    function getDockerCompose() {
        pb.collection('docker_compose').getOne(id, {
        }).then((record) => {
            compose = record
            console.log(description)
            description.innerHTML = record.description;
        }).catch(() => {

        }).finally(() => {
            loading = false
        });
    }

    function runDockerCompose(compose) {
		if (servidor){
            const t = {
                background: 'variant-filled-success',
                message: 'Starting docker compose up',
                hideDismiss: true,
                timeout: 3000
            };
            toastStore.trigger(t);
			pb.send("/functions/" + servidor.id + "/dockercompose/" + id + "/up", {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((resultat) => {
				try {
					console.log(resultat);
					var jsonObject = JSON.parse(resultat);
					if (jsonObject.stat == "ok") goto("/Containers")
					else {
						const t = {
							background: 'variant-filled-error',
                            hideDismiss: true,
							message: 'Cannot start docker compose: ' + jsonObject.resultat,
							timeout: 2000
						};
						toastStore.trigger(t);
					}
				} catch (error) {
					console.error("Error al parsear JSON:", error);
				}
			}).catch((error, test) => {
				console.log(test)
			});
		}
	}

    function downDockerCompose(compose) {
		if (servidor){
            const t = {
                background: 'variant-filled-success',
                message: 'Downing docker compose',
                hideDismiss: true,
                timeout: 3000
            };
            toastStore.trigger(t);
			pb.send("/functions/" + servidor.id + "/dockercompose/" + id + "/down", {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((resultat) => {
				try {
					console.log(resultat);
					var jsonObject = JSON.parse(resultat);
					if (jsonObject.stat == "ok") goto("/Containers")
					else {
						const t = {
							background: 'variant-filled-error',
                            hideDismiss: true,
							message: 'Cannot down docker compose: ' + jsonObject.resultat,
							timeout: 2000
						};
						toastStore.trigger(t);
					}
				} catch (error) {
					console.error("Error al parsear JSON:", error);
				}
			}).catch((error, test) => {
				console.log(test)
			});
		}
	}

    function delDockerCompose() {
        pb.collection('docker_compose').delete(id)
        .then((record) => {
            goto("/Compose")
        }).catch(() => {
            const t = {
                background: 'variant-filled-error',
                hideDismiss: true,
                message: 'Cannot delete docker compose',
                timeout: 2000
            };
            toastStore.trigger(t);
        });
    }

</script>
