import { UserType } from "../enums/enums";

export interface iEmployeeDTO {
	email: string;
	password: string;
	cpf: string;
	image: string;
	name: string;
	company: string;
	userType: UserType;
}
