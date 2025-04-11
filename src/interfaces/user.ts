import { UserType } from "../enums/enums";

export interface IUser {
	_id: string;
	email: string;
	password: string;
	userType: UserType;
	verificationToken?: string | null;
	verificationTokenExpireAt?: Date | null;
	lastLogin?: Date | null;
}
