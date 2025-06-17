
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
const API_URL = 'https://pawsy-backend.onrender.com/api';


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
        if (pet == null) {
            alert('No ha llenado los datos de la mascota!');
            throw new Error('No ha llenado los datos de la mascota!');
        } else {
            return fetch(`${API_URL}/mascota`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(pet)
            })
                .then(response => response.json())
                .catch(error => console.error('Error:', error + " - No se pudo registrar la mascota"));
        }
    },

    /**
     * Método para obtener todos los tipos de mascota disponibles.
     * @returns {Promise<Array>} Array de objetos con los tipos de mascota
     * @example
     * // Retorna: [{"id":1,"nombre":"Perro"}, {"id":2,"nombre":"Gato"}]
     */
    async render_types() {
        try {
            const response = await fetch(`${API_URL}/tipos-mascota`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const petTypes = await response.json();
            return petTypes;

        } catch (error) {
            console.error('Error fetching pet types:', error);
            throw new Error('No se pudieron obtener los tipos de mascota');
        }
    },

    /**
     * Método para obtener todas las mascotas registradas con información de tipo.
     * @returns {Promise<Array>} Array de objetos con las mascotas incluyendo el nombre del tipo
     * @example
     * // Retorna: [{"id":1,"nombre":"Firulais","descripcion":"Perro juguetón","edad":3,"clienteId":1,"tipoId":1,"tipo":"Perro"}, ...]
     */
    async render_pets() {
        try {
            // Obtener mascotas
            const response = await fetch(`${API_URL}/mascota/lista-mascotas`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const pets = await response.json();

            // Obtener tipos de mascota
            const petTypes = await this.render_types();

            // Añadir el nombre del tipo a cada mascota
            const petsWithTypes = pets.map(pet => {
                const type = petTypes.find(type => type.id === pet.tipoId);
                return {
                    ...pet,
                    tipo: type ? type.nombre : 'Tipo desconocido'
                };
            });

            return petsWithTypes;
        } catch (error) {
            console.error('Error fetching pets:', error);
            throw new Error('No se pudieron obtener las mascotas');
        }
    },

    /**
    * Método para obtener los datos de una mascota por su ID.
    * @param {number} id - ID de la mascota a consultar.
    * @returns {Promise<Object>} Objeto con los datos de la mascota.
    */
    async get_pet_by_id(id) {
        try {
            const response = await fetch(`${API_URL}/mascota/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const pet = await response.json();
            return pet;
        } catch (error) {
            console.error('Error fetching pet by id:', error);
            throw new Error('No se pudo obtener la mascota');
        }
    },

    async update_pet(id, pet) {
        console.log('Updating pet with ID:', id, 'and data:', pet);
        try {
            const response = await fetch(`${API_URL}/mascota/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(pet)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating pet:', error);
            throw new Error('No se pudo actualizar la mascota');
        }
    },

    async delete_pet(id) {
        try{
            const response = await fetch(`${API_URL}/mascota/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error deleting pet:', error);
            throw new Error('No se pudo eliminar la mascota');
        }
    }
}
