const API_URL = 'https://api.example.com';

export const userApi = {
    async signUp(user) {
        alert(user);
        if (user == null) {
            throw new Error('User data is required');
        }
        return true;
        // return fetch('https://api.example.com/signup', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(user),
        // })
        // .then(response => response.json())
        // .catch(error => console.error('Error:', error));
    },

    async resetPassword(token, newPassword) {
        if (token == null || newPassword == null) {
            throw new Error('Token and new password are required');
        }
        console.log("Token:", token);
        console.log("New Password:", newPassword);
        return true;
    },

    /**
     * Método para registrar una mascota.
     * @param {Object} pet 
     * @param {Integer} pet.edad - Edad de la mascota.
     * @param {String} pet.nombre - Nombre de la mascota.
     * @param {String} pet.descripcion - Descripción de la mascota. 
     * @returns {Promise<boolean>}
     */
    // @param {Integer} pet.tipo - ID del tipo de mascota (1,2,3...). ????
    // @param {Integer} pet.propietario - ID del propietario de mascota (1,2,3...). ????
    async register_pet(pet) {
        alert(pet);
        if (pet == null) {
            throw new Error('No ha llenado los datos de la mascota!');
        }
        return true;
        // return fetch('https://api.example.com/signup', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(pet),
        // })
        // .then(response => response.json())
        // .catch(error => console.error('Error:', error));
    }
}
