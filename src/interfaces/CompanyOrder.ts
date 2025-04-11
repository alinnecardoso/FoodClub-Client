import { OrderStatus } from "../enums/enums";
import { IDish } from "./dish";
import { IIndividualOrder } from "./IndividualOrder";

export interface ICompanyOrder {
	id: string;
	dishes: IDish[];
	company: string;
	collaboratorsOrders: IIndividualOrder[];
	createdAt: string;
	status: OrderStatus;
	restaurant: string;
	code: string;
}
