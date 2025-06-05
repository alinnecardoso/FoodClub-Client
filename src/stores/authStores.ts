import axios from "axios";
import { create } from "zustand";
import { IRestaurant } from "../interfaces/restaurant";
import { ICompany } from "../interfaces/company";
import { IEmployee } from "../interfaces/employee";
import { IBusinessDTO } from "../DTO/business.dto";
import { iEmployeeDTO } from "../DTO/employee.dto";
import { UserType } from "../enums/enums";

// const API_URL = "https://food-club-api.onrender.com/api/auth/"; //production
const API_URL = "http://localhost:5000/api/auth/"; //development

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function handleAxiosError(error: unknown, set: Function) {
	//Função criada para cuidar dos erros que podem ser tanto em relação ao back-end, rede ou qualquer outro erro
	if (axios.isAxiosError(error) && error.response) {
		set({
			error: error.response.data.message || "Erro desconhecido.",
			isLoading: false,
		});
	} else {
		set({
			error: "Erro de conexão. Tente novamente mais tarde.",
			isLoading: false,
		});
	}
}

interface iAuthStore {
	user: IRestaurant | ICompany | IEmployee | null;
	isAuthenticated: boolean;
	role: string;
	isLoading: boolean;
	error: string;
	message: string;
	businessDTO: IBusinessDTO;
	employeeDTO: iEmployeeDTO;
	login: (email: string, password: string) => Promise<void>;
	checkAuth: () => Promise<void>;
	logout: () => Promise<void>;
	updateBusinessDto: (businessDTO: IBusinessDTO) => void;
	updateEmployeeDto: (employeeDTO: iEmployeeDTO) => void;
	cleanBusinessDto: () => void;
	cleanEmployeeDto: () => void;
	createBusiness: (businessDTO: IBusinessDTO) => Promise<void>;
	createEmployee: (employeeDTO: iEmployeeDTO) => Promise<void>;
	setBusinessDTO: (businessDTO: IBusinessDTO) => void;
	setEmployeeDTO: (employeeDTO: iEmployeeDTO) => void;
	getRestaurant: (id: string) => Promise<void>;
}

export const useAuthStore = create<iAuthStore>((set) => ({
	user: null,
	isAuthenticated: false,
	isLoading: false,
	error: "",
	role: "",
	message: "",

	businessDTO: {
		name: "",
		cnpj: "",
		email: "",
		password: "",
		cep: "",
		number: "",
		image: "",
		userType: "",
		verificationToken: "",
		verificationTokenExpireAt: new Date(),
	},
	employeeDTO: {
		name: "",
		cpf: "",
		email: "",
		password: "",
		image: "",
		birthDate: new Date(),
		company: "",
		userType: UserType.EMPLOYEE,
	},

	getRestaurant: async (id: string) => {
		try {
			const response = await axios.get(API_URL + id, {
				withCredentials: true,
			});

			if (!response.data.success) {
				set({ error: response.data.message, isLoading: false });
				return;
			}

			set({ user: response.data.data, isLoading: false });
		} catch (error) {
			handleAxiosError(error, set);
		}
	},

	setEmployeeDTO: (employeeDTO: iEmployeeDTO) => {
		set({ employeeDTO: employeeDTO });
	},

	createEmployee: async (employeeDTO: iEmployeeDTO) => {
		try {
			const response = await axios.post(API_URL + "emsignup", employeeDTO, {
				withCredentials: true,
			});

			if (!response.data.success) {
				set({ error: response.data.message, isLoading: false });
				return;
			}

			set({ isLoading: false, message: response.data.message });
		} catch (error) {
			handleAxiosError(error, set);
		}
	},

	createBusiness: async (businessDTO: IBusinessDTO) => {
		try {
			const response = await axios.post(API_URL + "busignup", businessDTO, {
				withCredentials: true,
			});

			if (!response.data.success) {
				set({ error: response.data.message, isLoading: false });
				return;
			}

			set({
				isLoading: false,
				message: response.data.message,
				user: response.data.user,
				isAuthenticated: true,
			});
			return;
		} catch (error) {
			handleAxiosError(error, set);
		}
	},

	updateEmployeeDto: (employeeDTO: iEmployeeDTO) => {
		set({ employeeDTO });
	},

	updateBusinessDto: (businessDTO: IBusinessDTO) => {
		set({ businessDTO });
	},

	cleanBusinessDto: () => {
		set({
			businessDTO: {
				name: "",
				cnpj: "",
				email: "",
				password: "",
				image: "",
				cep: "",
				number: "",
				userType: "",
				verificationToken: "",
				verificationTokenExpireAt: new Date(),
			},
		});
	},

	setBusinessDTO: (businessDTO: IBusinessDTO) => {
		set({ businessDTO });
	},

	cleanEmployeeDto: () => {
		set({
			employeeDTO: {
				name: "",
				cpf: "",
				email: "",
				image: "",
				password: "",
				company: "",
				userType: UserType.EMPLOYEE,
			},
		});
	},

	checkAuth: async () => {
		// Setando o estado inicial de carregamento
		set({ isLoading: true, error: "" });

		try {
			// Faz a requisição para verificar a autenticação
			const response = await axios.get(API_URL + "check-auth", {
				withCredentials: true,
			});

			// Caso o backend retorne sucesso, atualiza o estado com o usuário
			set({
				user: response.data.user,
				isAuthenticated: response.data.success,
				isLoading: false,
			});
		} catch (error) {
			handleAxiosError(error, set);
		}
	},

	login: async (email: string, password: string) => {
		set({ isLoading: true, error: "" });
		try {
			const response = await axios.post(
				API_URL + "login",
				{
					email,
					password,
				},
				{
					withCredentials: true,
				}
			);

			if (!response.data.success) {
				set({ error: response.data.message, isLoading: false });
				return;
			}

			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			handleAxiosError(error, set);
		}
	},

	logout: async () => {
		set({ isLoading: true, error: "" });

		try {
			const response = await axios.post(
				API_URL + "logout",
				{},
				{
					withCredentials: true,
				}
			);

			if (response.data.success) {
				localStorage.removeItem("user");
				set({ user: null, isAuthenticated: false, isLoading: false });
				return;
			}

			set({ user: null, isAuthenticated: false, isLoading: false });
		} catch (error) {
			handleAxiosError(error, set);
		}
	},
}));
