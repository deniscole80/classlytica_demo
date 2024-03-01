export interface setUserInterests{
    user_id: number
    user_type: number
    interests: string[]
}

export interface setPic{
    user_id: number
    email: string
    img: string
    img_type: string
}

export interface followUser{
    user_id: number
    follower_id: number
    user_type: number
    follower_type: number
}

export interface finishOnboarding{
    user_id: number
    user_type: number
}

export interface fetchFollowSuggestions{
    user_id: number
    user_type: number
}