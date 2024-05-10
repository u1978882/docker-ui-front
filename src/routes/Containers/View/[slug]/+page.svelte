<section>
    <ol class="breadcrumb mb-2">
        <li class="crumb"><a class="anchor" href="/Containers">Containers</a></li>
        <li class="crumb-separator" aria-hidden>/</li>
        <li>{container.name}</li>
    </ol>

    {#if servidor}
        <a href="http://{new URL(window.location.href).hostname}:8888/?hostname={servidor.ip}&username={servidor.username}&password={getBase64Pass(servidor.pass)}&command=docker%20exec%20-it%20{id}%20bash" target="_blank">
            Test
        </a>
    {/if}

    <!--  -t -o "RemoteCommand=docker exec -it 5563bfef8234 bash"  -->
    <br>

</section>

<script>
	import { onMount } from "svelte";
    import { pb } from "../../../../pocketbase";
    import { servidorActual } from '../../../../stores';
    

    let servidor;
	const unsubscribe = servidorActual.subscribe(value => {
		servidor = value;
	});

    let container = {name: ""}

    let id

    onMount(() => {
        const ruta = window.location.href;
        const partes = ruta.split("/");
        id = partes[partes.length - 1];
    })


    // This will not work. It will print:
    // DOMException: Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.
    function getBase64Pass(pass) {
        try {
            return btoa(pass)
        } catch (error) {
            return "err"
        }
    }


    //-t -o "RemoteCommand=docker exec -it 5563bfef8234 bash"

</script>