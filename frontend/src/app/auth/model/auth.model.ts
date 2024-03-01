export interface verifyEmail{
    email: string
    username: string;
}

export interface registerSchool{
    user_type: number
    school_name: string
    username: string
    phone_number1: string
    phone_number2: string
    address: string
    email: string
    institution_type: number
    password?: string
}

export interface verifyCode{
    email: string
    code: string
}

export interface login{
    email: string
    password: string
}

export interface registerUser{
    user_type: number
    first_name: string
    last_name: string
    other_name: string
    username: string
    gender: string
    country: string
    status: string
    email: string
    phone_number: string
    password?: string
}


export interface passwordResetLink{
    email: string
}

export interface verifyResetLink{
    email: string
}

export interface setPassword{
    email: string
    password: string
}


