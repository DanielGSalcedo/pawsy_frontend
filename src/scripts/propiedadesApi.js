

const API_URL = 'http://api101.proyectos.fireploy.online/api/propiedades/propiedades';

export const propiedadesApi = {
    async getPropiedades() {
        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`Error al obtener propiedades: ${response.status}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Error en propiedadesApi:', error.message);
            return [];
        }
    }
}

export default propiedadesApi;

