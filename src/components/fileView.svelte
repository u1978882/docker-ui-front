<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	// Notes: Use `w-screen h-screen` to fit the visible canvas size.
	const cBase = 'bg-surface-100-800-token w-screen h-screen p-4';

</script>

{#if $modalStore[0]}
    <div class="w-full scroll-auto bg-surface-100-800-token p-4">
        <div class="sticky top-0">
            <div class="flex h-full w-full">
                <h2 class="h2 mb-3">{$modalStore[0].meta.nom}</h2>
                <div class="flex-auto"></div>
                <button class="btn btn-icon option m-2" on:click={parent.onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                </button>
            </div>
            <hr class="mb-3">
        </div>
        <div class="p-3" style="text-wrap: wrap !important;" bind:innerHTML={$modalStore[0].meta.content} contenteditable="false">

        </div>
    </div>
    <style>
        .option:hover {
            background-color: rgba(var(--color-surface-700));
        }
    </style>
{/if}