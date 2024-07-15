import { create } from "zustand";
import { IDolar, IMoney } from "../interfaces/dolar";
import { loadOptions } from "@babel/core";

// Definir la interfaz del estado
interface DolarState {
  dolars: IDolar[];
  loading: boolean;
  setDolars: (dolars: IDolar[]) => void;
  getDolars: () => Promise<void>;
}

interface MoneyState {
  money: IMoney[];
  loading: boolean;
  setMoney: (money: IMoney[]) => void;
  getMoney: () => Promise<void>;
}

// Crear el store con Zustand
export const useDolarStore = create<DolarState>((set) => ({
  dolars: [],
  loading: true,
  setDolars: (dolars) => set({ dolars }),
  getDolars: async () => {
    try {
      const response = await fetch("https://dolarapi.com/v1/dolares");
      const data = await response.json();
      set({ dolars: data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
}));

export const useMoneyStore = create<MoneyState>((set) => ({
  money: [],
  loading: true,
  setMoney: (money) => set({ money }),
  getMoney: async () => {
    try {
      const response = await fetch("https://dolarapi.com/v1/cotizaciones");
      const data = await response.json();
      set({ money: data });
    } catch (error) {
      console.error("Error fetching money data:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
