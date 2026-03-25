import { hashPassword } from "../../util.js"

export class UsersDTO {
    sessionData(user){
        return {
            first_name: user.first_name,
            email: user.email,
            role: user.role
        }
    }

    saveUser(user){
        return {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: hashPassword(user.password),
            role: user.role
        }
    }
}