import { UserType } from "../enums/enums";
import { ICompanyOrder } from "./CompanyOrder";
import { IUser } from "./user";

export interface IRestaurant extends IUser {
	name: string;
	cnpj: string;
	cep: string;
	number: string;
	dishes: {
		id: string; // Agora, cada prato tem um ID
		name: string;
		description: string;
		price: number;
		image: string;
		ratings: { userId: string; rating: number }[];
	}[]; // Array de pratos com ID
	companyOrders: ICompanyOrder[];
	userType: UserType;
}
