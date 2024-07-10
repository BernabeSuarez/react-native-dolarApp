import { create } from "zustand";
import { IDolar } from "../interfaces/dolar";

interface DolarState {
  dolars: IDolar[];
  setDolars: (dolars: IDolar[]) => void;
}

export const useDolarStore = create<DolarState>((set) => ({
  dolars: [],
  setDolars: (dolars) => set({ dolars }),
}));
