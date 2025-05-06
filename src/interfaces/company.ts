import { IEmployee } from "./employee";
import { IUser } from "./user";

export interface ICompany extends IUser {
	name: string;
	cnpj: string;
	cep: string;
	number: string;
	affiliateRestaurants: string[];
	employees: IEmployee[];
}
