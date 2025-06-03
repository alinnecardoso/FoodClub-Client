export interface IIndividualOrder {
	_id: string;
	order: {
		dishId:  {
			_id: string;
			name: string;
		}
		quantity: number;
	};
	employee: string;
	companyOrder: string;
}
