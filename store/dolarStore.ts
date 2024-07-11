import { create } from "zustand";
import { useEffect } from "react";
import { IDolar } from "../interfaces/dolar";

// Definir la interfaz del estado
interface DolarState {
  dolars: IDolar[];
  setDolars: (dolars: IDolar[]) => void;
  getDolars: () => Promise<void>;
}

// Crear el store con Zustand
export const useDolarStore = create<DolarState>((set) => ({
  dolars: [],
  setDolars: (dolars) => set({ dolars }),
  getDolars: async () => {
    try {
      const response = await fetch("https://dolarapi.com/v1/dolares");
      const data = await response.json();
      set({ dolars: data });
    } catch (error) {
      console.error(error);
    } finally {
      // Puedes manejar el estado de carga aquí si es necesario
    }
  },
}));
