//PET API

/**
 * API module for pet-related operations.
 * 
 * @namespace petApi
 * @description This module provides methods to interact with pet data through API calls.
 * The base pet object structure is:
 * {
 *   "id": number,
 *   "nombre": string,
 *   "descripcion": string,
 *   "edad": number,
 *   "clienteId": number,
 *   "tipoId": number
 * }
 */
const API_URL = 'https://api.example.com';


export const petApi = {

    /**
     * Método para registrar una mascota.
     * @param {Object} pet 
     * @param {Integer} pet.edad - Edad de la mascota.
     * @param {Integer} pet.clienteId - Propietario de la mascota.
     * @param {Integer} pet.tipoId - Tipo de la mascota.
     * @param {String} pet.nombre - Nombre de la mascota.
     * @param {String} pet.descripcion - Descripción de la mascota.
     * @returns {Promise<boolean>}
     */
    async register_pet(pet) {
        alert(pet);
        if (pet == null) {
            throw new Error('No ha llenado los datos de la mascota!');
        } else {
            console.log('Pet data:', pet);
            return true;
        }

        // return fetch('https://api.example.com/signup', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(pet),
        // })
        // .then(response => response.json())
        // .catch(error => console.error('Error:', error));

        // -> listado mascotas
    }
}
