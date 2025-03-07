import bcrypt from 'bcrypt';

// FUNCION QUE HASHEA EL PASSWORD
export const hashPassword = async (password : string) =>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

// FUNCION VALIDAD LA AUTENTICACION 
export const checkPassword = async (enterPassword: string, hashP: string) => {
    return await bcrypt.compare(enterPassword, hashP)

}