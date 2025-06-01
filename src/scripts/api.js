// api/mascotas.js

async function listarMascotas() {
    try {
        const response = await fetch('http://localhost:3000/api/mascotas/listar', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener las mascotas');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en listarMascotas:', error);
        return [];
    }
}

export const api = {
    listarMascotas,
};
