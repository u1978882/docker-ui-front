import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

import { browser, building, dev, version } from '$app/environment';

export let pb

if (dev) pb = new PocketBase('http://192.168.1.41:8090');
if (building) pb = new PocketBase(window.location.hostname + '8080'); 
else pb = new PocketBase('http://192.168.1.41:8090');

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    console.log('authStore changed', auth);
    currentUser.set(pb.authStore.model);
});