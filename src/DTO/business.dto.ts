export interface IBusinessDTO {
	email: string;
	password: string;
	verificationToken: string | null;
	verificationTokenExpireAt: Date | null;
	name: string;
	cnpj: string;
	image: string;
	cep: string;
	number: string;
	userType: string;
}
