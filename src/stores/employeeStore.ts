import axios from "axios";
import { create } from "zustand";
import { formatAxiosError } from "./authStores";

// const API_URL = "https://food-club-api.onrender.com/api/auth/"; //production
const API_URL = "http://localhost:5000/api/employee/"; //development



interface iEmployeeStore {
  isLoading: boolean;
  error: string;
  message: string;
  removeEmployee: (employeeId: string) => Promise<{ success: boolean; message?: string }>;
}

export const useEmployeeStore = create<iEmployeeStore>((set) => ({
  isLoading: false,
  error: "",
  message: "",

  removeEmployee: async (employeeId: string) => {
    set({ isLoading: true, error: "", message: "" });
    try {
      const response = await axios.delete(API_URL + employeeId, {
        withCredentials: true,
      });

      if (!response.data.success) {
        set({ error: response.data.message, isLoading: false });
        return { success: false, message: response.data.message };
      }

      set({ isLoading: false, message: 'Funcionário removido com sucesso.' });
      return { success: true, message: 'Funcionário removido com sucesso' };
    } catch (error) {
      return formatAxiosError(error);

    }
  },
}));
