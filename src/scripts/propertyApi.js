// PROPERTY API

const PROPERTY_API_URL = 'https://pawsy-backend.onrender.com/api/propiedades';

/**
 * API module for property-related operations.
 * 
 * @namespace propertyApi
 * @description This module provides methods to interact with property data through API calls.
 * The base property object structure is:
 * {
 *   "id": number,
 *   "nombre": string,
 *   "direccion": string,
 *   "descripcion": string,
 *   "capacidad": number,
 *   "precioPorNoche": number,
 *   "usuario": {
 *     "id": number,
 *     "nombre": string,
 *     "email": string
 *   },
 *   "servicios": [
 *     {
 *       "id": number,
 *       "nombre": string
 *     }
 *   ]
 * }
 */
export const propertyApi = {

    /**
     * Obtener todas las propiedades.
     * @returns {Promise<Array>} Array de propiedades.
     */
    async render_properties() {
        try {
            const response = await fetch(`https://pawsy-backend.onrender.com/api/propiedades`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const properties = await response.json();
            return properties;
        } catch (error) {
            console.error('Error fetching properties:', error);
            throw new Error('No se pudieron obtener las propiedades');
        }
    },

    async getUserProperties() {
        try {
            const response = await fetch(`${PROPERTY_API_URL}/lista-propiedades`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const properties = await response.json();
            return properties;
        } catch (error) {
            console.error('Error fetching properties:', error);
            throw new Error('No se pudieron obtener las propiedades');
        }
    },

    /**
     * Obtener una propiedad por su ID.
     * @param {number} id - ID de la propiedad.
     * @returns {Promise<Object>} Objeto propiedad.
     */
    async get_property_by_id(id) {
        try {
            const response = await fetch(`${PROPERTY_API_URL}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const property = await response.json();
            return property;
        } catch (error) {
            console.error('Error fetching property by id:', error);
            throw new Error('No se pudo obtener la propiedad');
        }
    },

    /**
     * Registrar una nueva propiedad.
     * @param {Object} property - Objeto propiedad.
     * @returns {Promise<Object>} Propiedad creada.
     */
    async register_property(property) {
        console.log('Registering property:', property);
        if (!property) {
            alert('No ha llenado los datos de la propiedad!');
            throw new Error('No ha llenado los datos de la propiedad!');
        }
        try {
            const response = await fetch(PROPERTY_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(property)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error registering property:', error);
            throw new Error('No se pudo registrar la propiedad');
        }
    },

    // /**
    //  * Obtener todos los servicios disponibles.
    //  * @returns {Promise<Array>} Array de servicios.
    //  */
    // async render_services() {
    //     try {
    //         const response = await fetch('https://api101.proyectos.fireploy.online/api/servicios', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             }
    //         });
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         const services = await response.json();
    //         return services;
    //     } catch (error) {
    //         console.error('Error fetching services:', error);
    //         throw new Error('No se pudieron obtener los servicios');
    //     }
    // }
};
