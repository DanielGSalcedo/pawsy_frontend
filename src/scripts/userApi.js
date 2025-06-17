const API_URL = "https://api101.proyectos.fireploy.online";
// const API_KEY = "PMAK-68321a03671fac000137a1dc-5a67697d08fc443ed193b1fe9d684a691b";

export const userApi = {
  async signUp(user) {
        console.log(user);

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Si necesitas una API KEY, descomenta esta línea:
                    // "x-api-key": API_KEY,
                },
                body: JSON.stringify(user),
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

  async signIn(email, password) {
    const userData = {
      email: email,
      password: password,
    };
    console.log(userData);

    try {
            const response = await fetch(`${API_URL}/auth/login`, {
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
            console.error("Error durante el login:", error);
            throw error;
        }
  },

  async getUserProfile(token) {
    // console.log(token);
    try {
      const response = await fetch(`${API_URL}/api/usuario/perfil`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // Si necesitas una API KEY, descomenta esta línea:
          // "x-api-key": API_KEY,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || "Unknown error"}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
      throw error;
    }
  },

  async updateUserProfile(token, user) {
    console.log(user);
    const userData = {
      "nombre": user.nombre,
      "cuidador": user.cuidador || false
    }
    try {
      const response = await fetch(`${API_URL}/api/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || "Unknown error"}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
      throw error;
    }
  },

  async logout() {
    // Aquí podrías implementar la lógica de cierre de sesión si es necesario
    // Por ejemplo, eliminar el token del almacenamiento local
    localStorage.removeItem("token");
    console.log("User logged out");
    return true;
  },
};
