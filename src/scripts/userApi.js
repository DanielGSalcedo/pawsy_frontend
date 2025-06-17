const API_URL = "https://6dd2de48-17d3-4059-992e-4feb7068963b.mock.pstmn.io";
// const API_KEY = "PMAK-68321a03671fac000137a1dc-5a67697d08fc443ed193b1fe9d684a691b";

export const userApi = {
  async signUp(user) {
        console.log(user);
        // Asegurar que siempre se use "CLIENTE" como tipoUsuario
        const userData = {
            email: user.email,
            password: user.password,
            nombre: user.nombre,
            // telefono: user.telefono || "", // Si no se proporciona, se usa una cadena vacía
            tipoUsuario: "CLIENTE"
        };

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Si necesitas una API KEY, descomenta esta línea:
                    // "x-api-key": API_KEY,
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error: ${errorData.message || "Unknown error"}`);
            }
            return response;
        } catch (error) {
            console.error("Error durante el registro:", error);
            throw error;
        }
    },

  async resetPassword(token, newPassword) {
    if (token == null || newPassword == null) {
      throw new Error("Token and new password are required");
    }
    console.log("Token:", token);
    console.log("New Password:", newPassword);
    return true;
  },
};
