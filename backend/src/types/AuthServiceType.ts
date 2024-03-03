import { UserRegisterBody } from "./UserRegisterBodyType"
import { UserLoginBody } from "./UserLoginBodyType"

export interface IAuthService {
	verifyUserCredentials: (data: UserLoginBody) => Promise<void>
	registerUser: (data: UserRegisterBody) => Promise<void>
	generateToken: (email: string) => string
}
