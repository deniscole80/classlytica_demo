export interface profileComplete{
    user_id: number
    user_type: number
}

export interface myFollowers{
    user_id: number
    user_type: number
}

export interface myFollowings{
    user_id: number
    user_type: number
}

export interface createCv{
    user_id: number
    user_type: number
    firstname: string
    lastname: string
    address: string
    mobile: string
    email: string
    pry_school: string
    sec_school: string
    university: string
    experience: experience[]
}

export interface experience{
    work_place: string
    duration: string
    role: string
}

export interface viewCv{
    user_id: number
    user_type: number
}

export interface editUserProfile{
    user_id: number
    user_type: number
    phone_number: string
    bio: string
}

export interface viewProfile{
    user_id: number
    user_type: number
    visitor_id?: number
    visitor_type?: number
    start: number
    length: number
}

export interface editSchoolProfile{
    user_id: number
    user_type: number
    phone_number1: string
    phone_number2: string
    bio: string
}

export interface completeUserProfile{
    user_id: number
    user_type: number
    bio: string
}

export interface viewProfile{
    user_id: number
    user_type: number
    start: number
    length: number
}

export interface fetchMyKids{
    user_id: number
    user_type: number
}
