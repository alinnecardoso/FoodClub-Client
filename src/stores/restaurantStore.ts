import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IRestaurant } from "../interfaces/restaurant";
import { IDishDTO } from "../DTO/dish.dto";
import axios from "axios";
import { IDish } from "../interfaces/dish";
import { handleAxiosError } from "../utils/utils";

const API_URL = "http://localhost:5000/api/restaurant/";

interface iRestaurantStore {
	restaurants: IRestaurant[];
	restaurant: IRestaurant | null;
	isLoading: boolean;
	error: string;
	dishDTO: IDishDTO;
	message: string;
	dishes: IDish[];
	updateDishDTO: (dishDTO: IDishDTO) => void;
	createDish: (dishDTO: IDishDTO) => Promise<void>;
	cleanDishDTO: () => void;
	listDishes: (restaurantId: string) => Promise<void>;
	cleanDishes: () => void;
	getRestaurant: (id: string) => Promise<void>;
	updateCompanyOrderStatus: (id: string, status: string) => Promise<void>;
	getRestaurants: () => Promise<void>;
}

export const useRestaurantStore = create<iRestaurantStore>()(
	persist(
		(set) => ({
			restaurants: [],
			restaurant: null,
			isLoading: false,
			message: "",
			error: "",
			dishDTO: {
				name: "",
				description: "",
				price: 0,
				image: "",
				restaurantId: "",
			},
			dishes: [],

			cleanDishes: () => set({ dishes: [] }),

			updateCompanyOrderStatus: async (companyOrderId: string, status: string) => {
				try {
					const response = await axios.patch(
						API_URL + "companyorder",
						{ status, companyOrderId },
						{
							withCredentials: true,
						}
					);
					if (!response.data.success) {
						set({ error: response.data.message });
						return;
					}
					set({ message: response.data.message });
				} catch (error) {
					handleAxiosError(error, set);
				}
			},

			getRestaurants: async () => {
				try {
					set({ isLoading: true, error: "" });

					const response = await axios.get(API_URL + "list");

					if (!response.data.success) {
						set({ error: response.data.message, isLoading: false });
						return;
					}

					set({
						restaurants: response.data.data,
						isLoading: false,
					});
				} catch (error) {
					handleAxiosError(error, set);
				}
			},

			getRestaurant: async (id: string) => {
				try {
					set({ isLoading: true, error: "" });
					const response = await axios.get(API_URL + id);
					if (!response.data.success) {
						set({ error: response.data.message, isLoading: false });
						return;
					}
					set({ restaurant: response.data.data, isLoading: false });
				} catch (error) {
					handleAxiosError(error, set);
				}
			},

			updateDishDTO: (dishDTO: IDishDTO) => set({ dishDTO }),
			cleanDishDTO: () =>
				set({
					dishDTO: {
						name: "",
						description: "",
						price: 0,
						image: "",
						restaurantId: "",
					},
				}),

			createDish: async (dishDTO: IDishDTO) => {
				set({ isLoading: true, error: "" });

				try {
					const response = await axios.post(API_URL + "dish", dishDTO, {
						withCredentials: true,
					});

					if (!response.data.success) {
						set({
							error: response.data.message,
							isLoading: false,
							dishDTO: {
								name: "",
								description: "",
								price: 0,
								image: "",
								restaurantId: "",
							},
						});
						return;
					}

					set({ isLoading: false, message: response.data.message });
				} catch (error) {
					handleAxiosError(error, set);
				}
			},

			listDishes: async (restaurantId: string) => {
				set({ isLoading: true, error: "", dishes: [] });
				try {
					const response = await axios.get(API_URL + restaurantId + "/dishes", {
						withCredentials: true,
					});

					if (!response.data.success) {
						set({ error: response.data.message, isLoading: false });
						return;
					}

					set({ dishes: response.data.data, isLoading: false });
				} catch (error) {
					handleAxiosError(error, set);
				}
			},
		}),
		{
			name: "restaurant-storage",
			partialize: (state) => ({ restaurant: state.restaurant }),
		}
	)
);
