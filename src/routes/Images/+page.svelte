<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<section>
	<ol class="breadcrumb mb-2">
        <li>Images</li>
    </ol>
	<div class="flex mb-2">
		<div class="">
			<h1 class="h1 mb-2">
				Images
			</h1>
		</div>
		<div class="flex-auto"></div>
		<div class="">
			<button on:click={() => {modalPullImage(servidor)}} type="button" class="btn variant-filled-primary mb-4 p-2 mr-3">
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-cloud-arrow-down" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708z"/>
						<path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
					  </svg>
				</span>
				<span>
					Pull
				</span>
			</button>
		</div>
		<div class="">
			<button on:click={() => {llistaImatges(servidor)}} type="button" class="btn variant-filled-primary mb-4 p-2">
				{#if loading}
					<ProgressRadial width={'w-5'} value={undefined} />
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
						<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
					</svg>
				{/if}
			</button>
		</div>
	</div>

	
	<!-- Responsive Container (recommended) -->
	<div class="table-container">
		<!-- Native Table Element -->
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Repository</th>
					<th>Tag</th>
					<th>Image Id</th>
					<th>Created Since</th>
					<th>Size</th>
				</tr>
			</thead>
			<tbody>
				{#each list as row, i}
					<tr>
						<td>{row.Repository}</td>
						<td>{row.Tag}</td>
						<td>{row.ID}</td>
						<td>{row.CreatedSince}</td>
						<td>{row.Size}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>


</section>

<script>
	import { onMount } from "svelte";
	import { servidorActual } from '../../stores';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
    import { pb } from '../../pocketbase'
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	let servidor;
	const unsubscribe = servidorActual.subscribe(value => {
		servidor = value;
	});

	onMount(() => {
		llistaImatges();
	})

	let list = [];
	let loading = false;
	$: llistaImatges(servidor);
	function llistaImatges(servidor) {
		if (servidor){
			list = [];
			loading = true;
			pb.send("/functions/images/" + servidor.id, {
				// for all possible options check
				// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
			}).then((llista) => {
				loading = false;
				console.log(llista)
				try {
					var jsonObject = JSON.parse(llista);
					list = jsonObject.images;
					console.log("llista", jsonObject);
				} catch (error) {
					console.error("Error al parsear JSON:", error);
				}
			}).catch(() => {
				loading = false;
				list = [];
			});
		}
	}

	function modalPullImage(servidor) {
		const modal = {
			type: 'prompt',
			// Data
			title: 'Enter Image Name',
			body: 'Provide the name of the image that you want to download.',
			// Populates the input value and attributes
			valueAttr: { type: 'text', minlength: 0, maxlength: 100, required: true },
			// Returns the updated response value
			response: (r) => {
				if (r) {
					loading = true;				
					pb.send("/functions/" + servidor.id + "/image/" + r + "/pull", {
						// for all possible options check
						// https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
					}).then((llista) => {
						llistaImatges(servidor)
					}).catch(() => {
						const t = {
							background: 'variant-filled-error',
							message: 'Cannot pull docker image',
							timeout: 4000
						};
						toastStore.trigger(t);
					}).finally(() => {
						loading = false;				
					});
				}
			},
		};
		modalStore.trigger(modal);
	}

</script>