// USER - MOLDE PADRE
export type User = {
    handle: string
    name: string
    email : string
    _id: string
    descripcion: string
    image : string
    links : string
}

// HEREDAN DE USER 
export type RegisterForm = Pick<User, 'handle' | 'email' | 'name'> & {
    password: string
    password_confirmation: string
}

export type LoginForm = Pick<User, 'email'> & {
    password: string
}

export type ProfileForm = Pick<User, 'handle' | 'descripcion'>

export type SocialNetwork = {
    id: number,
    name: string,
    url: string,
    enabled: boolean
}

export type DevTreeLinks = Pick<SocialNetwork, 'name' | 'url' | 'enabled'>
