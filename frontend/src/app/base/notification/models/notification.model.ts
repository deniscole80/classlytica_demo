export interface likeNotification{
    poster_id: number
    poster_type: number
    start: number
    length: number
}

export interface shareNotification{
    poster_id: number
    poster_type: number
    start: number
    length: number
}

export interface followNotification{
    following_id: number
    following_type: number
    start: number
    length: number
}

export interface commentNotification{
    poster_id: number
    poster_type: number
    start: number
    length: number
}

export interface employmentNotification{
    user_id: number
    user_type: number
    start: number
    length: number
}