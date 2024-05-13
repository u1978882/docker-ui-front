<form method="POST" on:submit|preventDefault={() => {submitServer()}}>
<div class="card p-2 w-modal shadow-xl space-y-4">
    <header class="card-header h2">Create new server</header>
    <section class="p-4">
        <label class="label mb-2">
            <span>*Name</span>
            <input bind:value={name} class="input variant-form-material" type="text" placeholder="Name" required />
        </label>
        <div class="flex flex-wrap mb-2">
            <div class="w-full md:w-3/4 mb-6 md:mb-0">
                <label class="label">
                    <span>*Ip Address</span>
                    <input bind:value={ipAddress} class="input variant-form-material" type="text" placeholder="Ip Address" required/>
                </label>
            </div>
            <div class="w-full md:w-1/4 pl-4 mb-6 md:mb-0">
                <label class="label">
                    <span>*Port</span>
                    <input bind:value={port} class="input variant-form-material" type="number" placeholder="Port" required/>
                </label>
            </div>
        </div>
        <label class="label mb-2">
            <span>Description</span>
            <textarea bind:value={description} class="textarea variant-form-material" rows="4" placeholder="New Ubuntu 22.04 With dhcp server" />
        </label>
        <TabGroup justify="justify-center">
            <Tab bind:group={tabSet} name="tab1" value={0}>
                <span>KeyFile</span>
            </Tab>
            <Tab bind:group={tabSet} name="tab2" value={1}>Password</Tab>
            <!-- Tab Panels --->
            <svelte:fragment slot="panel">
                {#if tabSet === 0}
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <label class="label">
                        <span>*Username</span>
                        <input bind:value={username} class="input variant-form-material" type="text" placeholder="Username" required>
                    </label> 
                    <label class="label">
                        <span>*KeyFile</span>
                        <input class="input" type="file" required/>
                    </label> 
                </div>
                {:else if tabSet === 1}
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <label class="label">
                            <span>*Username</span>
                            <input bind:value={username} class="input variant-form-material" type="text" placeholder="Username" required>
                        </label> 
                        <label class="label">
                            <span>*Password</span>
                            <input bind:value={password} class="input variant-form-material" type="password" placeholder="Enter password..." required>
                        </label> 
                        <label class="label">
                            <span>*Repeat password</span>
                            <input bind:value={passwordRepeat} class="{passwordClass()} input variant-form-material" type="password" placeholder="Repeat password..." required>
                        </label> 
                    </div>
                {/if}
            </svelte:fragment>
        </TabGroup>
    </section>
    <footer class="card-footer d-flex">
        <button on:click={() => {modal.close()}} type="button" class="btn variant-soft-error">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                  </svg>
            </span>
            <span>Close</span>
        </button>
        <button type="submit" class="btn variant-soft-primary">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-database-add" viewBox="0 0 16 16">
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0"/>
                    <path d="M12.096 6.223A5 5 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.5 4.5 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-.813-.927Q8.378 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.6 4.6 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10q.393 0 .774-.024a4.5 4.5 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777M3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4"/>
                  </svg>
            </span>
            <span>Create</span>
        </button>
    </footer>
</div>
</form>

<script>
	import { getModalStore, getDrawerStore } from "@skeletonlabs/skeleton";
    import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
    import { servidorActual, setServidorActual, servers } from '../stores.js';
    import { pb } from '../pocketbase'

    import PocketBase from 'pocketbase';

    var modal = getModalStore();
    var drawer = getDrawerStore();


    let tabSet = 0;

    let password = "";
    let passwordRepeat = "";
    let name;
    let ipAddress;
    let port = 22;
    let description;
    let username;
    let keyFile;

    $: passwordClass = () => {
        if (password == "" || passwordRepeat == "") return ""
        else if(password !== passwordRepeat) return "input-error"
        else return "input-success"
    }

    function submitServer() {
        console.log("submiting")
        var data = {};
        if (password != undefined) {
            data = {
                "name": name,
                "ip": ipAddress,
                "username": username,
                "pass": password,
                "port": port,
                "usePassword": true
            };
        } else {
            // TODO: Falta keyfile
            data = {
                "name": name,
                "ip": ipAddress,
                "username": username,
                "pass": password,
                "port": port,
                "usePassword": false
            };
        }

        pb.collection('server').create(data)
        .then((record) => {
            setServidorActual(record);
            modal.close();
            drawer.close();
            // TODO: Mostrar toast tot correcte
        }).catch((err) => {
            // TODO: Mostrar toast error
        });
    }

</script>