<script lang="ts">
	import { onMount, type SvelteComponent } from 'svelte';

	// Stores
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';

    import { servidorActual, setServidorActual, servers } from '../stores.js';
    import { pb } from '../pocketbase';
	import { goto } from '$app/navigation';

    let servidor;
	const unsubscribe = servidorActual.subscribe(value => {
		servidor = value;
	});
    const toastStore = getToastStore();

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	// Notes: Use `w-screen h-screen` to fit the visible canvas size.
	const cBase = 'bg-surface-100-800-token w-screen h-screen p-4';

    let name
    let params = [{var: "", val: ""}]

    function runContainer(runString) {
            if (servidor){
                pb.send("/functions/" + servidor.id + "/run/" + runString, {
                    // for all possible options check
                    // https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
                }).then((resultat) => {
                    try {
                        console.log(resultat);
                        var jsonObject = JSON.parse(resultat);
                        if (jsonObject.stat == "ok"){
                            goto("/Containers")
                            parent.onClose()
                        } 
                        else {
                            const t = {
                                background: 'variant-filled-error',
                                hideDismiss: true,
                                message: 'Cannot run docker container: ' + jsonObject.resultat,
                                timeout: 6000
                            };
                            toastStore.trigger(t);
                        }
                    } catch (error) {
                        console.error("Error al parsear JSON:", error);
                    }
                }).catch((test) => {
                    console.log(test)
                });
            }
        }

    function runImage() {
        let runString = " "
        params.forEach(element => { runString += element.var + " " + element.val + " " });
        if (name) runString += " --name " + name + " "
        runString += " " + $modalStore[0].meta.name + ":" + $modalStore[0].meta.tag + " "
        console.log(runString)
        runContainer(runString)
    }

</script>

{#if $modalStore[0]}
    <div class="w-modal scroll-auto bg-surface-100-800-token p-4 rounded">
        <div class="sticky top-0">
            <div class="flex h-full w-full mb-1">
                <h1 class="h1">
                    Run Image
                </h1>
                <div class="flex-auto"></div>
                <button class="btn btn-icon option m-2" on:click={parent.onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                </button>
            </div>
            <hr class="mb-3">
            <label class="label mb-3">
                <span>Container name</span>
                <!-- svelte-ignore a11y-autofocus -->
                <input bind:value={name} class="input variant-form-material" type="text" placeholder="Name"/>
            </label>
            <h3 class="h3 mb-2">
                Environment variables
            </h3>
            {#each params as param, index}
                <div class="flex w-full mb-2">
                    {#if index == 0}
                        <label class="label mr-2 w-64">
                            <span>Variable</span>
                            <input bind:value={param.var} class="input variant-form-material w-full" type="text" placeholder="Variable" />
                        </label>
                        <label class="label ml-2 mr-2 w-64 h-full">
                            <span>Value</span>
                            <input bind:value={param.val} class="input variant-form-material w-full" type="text" placeholder="Value" />
                        </label>
                    {:else}
                        <input bind:value={param.var} style="height: 42px;" class="input variant-form-material mr-2 w-64" type="text" placeholder="Variable" />
                        <input bind:value={param.val} style="height: 42px;"  class="input variant-form-material  ml-2 mr-2 w-64" type="text" placeholder="Value" />
                    {/if}
                    {#if index == params.length-1 }
                        <button on:click={() => {params.push({var: "", val: ""}); params = params}} type="button" class="btn {index == 0 ? 'mt-6' : ''}">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                                  </svg>
                            </span>
                        </button>
                    {:else}
                        <button on:click={() => {params.splice(index, 1); params = params}} type="button" class="btn {index == 0 ? 'mt-6' : ''}">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                                </svg>
                            </span>
                        </button>
                    {/if}
                </div>
            {/each}
            <hr class="mb-3 mt-4">
            <div class="flex">
                <div class="grow"></div>
                <button on:click={parent.onClose} type="button" class="btn variant-soft-secondary mr-2">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                          </svg>
                    </span>
                    <span>Cancel</span>
                </button>
                <button on:click={() => {runImage()}} type="button" class="btn variant-soft-primary">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                          </svg>
                    </span>
                    <span>Run</span>
                </button>
            </div>
        </div>
    </div>
    <style>
        .option:hover {
            background-color: rgba(var(--color-surface-700));
        }
    </style>
{/if}