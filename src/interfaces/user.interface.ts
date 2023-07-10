// extends UserCredentials without the password
export interface User extends Omit<UserCredentials, 'password'> {
    _id: string,
}

export interface UserCredentials {
    email: string,
    password: string
}

// for front developing
export interface UserFront extends UserCredentials {
    name: string
}