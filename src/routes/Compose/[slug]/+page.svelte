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
            <button on:click={() => {runDockerCompose()}} type="button" class="btn variant-filled-primary p-3">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                    </svg>
                </span>
                <span>
                    Run
                </span>
            </button>
        </div>
        <br>
        <div>
            {compose.description}
        </div>
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
    import PocketBase from 'pocketbase';
    import { storeHighlightJs } from '@skeletonlabs/skeleton';
    import { CodeBlock } from '@skeletonlabs/skeleton';

    let compose = {}
    let description
    let id
    let loading = true

    onMount(() => {
        loading = true
        console.log("Data", data)
        const ruta = window.location.href;
        const partes = ruta.split("/");
        id = partes[partes.length - 1];
        //console.log("Param", $page.data.q)
        getDockerCompose()
    })

    const pb = new PocketBase('http://127.0.0.1:8090');
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

    function runDockerCompose() {
        window.location.href = "/Containers"
    }

</script>
