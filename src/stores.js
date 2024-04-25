import { writable } from 'svelte/store';

export const servers = writable([]);

export function setServers(newRecords) {
    servers.set(newRecords);
}

export const servidorActual = writable(null);

export function setServidorActual(nuevoServidor) {
    console.log("Servidor actual:", nuevoServidor)
    servidorActual.set(nuevoServidor);
}