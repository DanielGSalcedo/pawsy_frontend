const API_URL = "https://pawsy-backend.onrender.com/api";

import { petApi } from "./petApi";
import { propertyApi } from "./propertyApi";

export const rentsApi = {
  async getAllRents_Active(token) {
    try {
      const response = await fetch(`${API_URL}reservas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || "Unknown error"}`);
      }
      const rents = await response.json();
      // Enriquecer cada reserva con info de mascota y propiedad
      const enriched = await Promise.all(
        rents.map(async (rent) => {
          let pet = null;
          let property = null;
          try {
            pet = await petApi.get_pet_by_id(rent.mascotaId);
          } catch (e) {}
          try {
            property = await propertyApi.get_property_by_id(rent.propiedadId);
          } catch (e) {}
          return {
            ...rent,
            pet,
            property,
          };
        })
      );
      return enriched;
    } catch (error) {
      console.error("Error al obtener reservas activas:", error);
      throw error;
    }
  },
  async getAllGuests_Active(token) {
    try {
      const response = await fetch(`${API_URL}reservas2`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || "Unknown error"}`);
      }
      const rents = await response.json();
      // Enriquecer cada reserva con info de mascota y propiedad
      const enriched = await Promise.all(
        rents.map(async (rent) => {
          let pet = null;
          let property = null;
          try {
            pet = await petApi.get_pet_by_id(rent.mascotaId);
          } catch (e) {}
          try {
            property = await propertyApi.get_property_by_id(rent.propiedadId);
          } catch (e) {}
          return {
            ...rent,
            pet,
            property,
          };
        })
      );
      return enriched;
    } catch (error) {
      console.error("Error al obtener reservas activas:", error);
      throw error;
    }
  },
};
