export interface fetchFeeds{
    user_id: number
    user_type: number
    start: number
    length: number
}

export interface createTextPost{
    user_id: number
    user_type: number
    text: string
}

export interface createImagePost{
    user_id: number
    user_type: number
    image: string[]
}

export interface createImagePostCaption{
    user_id: number
    user_type: number
    text: string
    image: string[]
}

export interface createVideoPost{
    user_id: number
    user_type: number
    video: string
}

export interface createVideoPostCaption{
    user_id: number
    user_type: number
    text: string
    video: string
}

export interface likePost{
    user_id: number
    user_type: number
    post_id: number
    poster_id: number
    poster_type: number
}

export interface fetchFeed{
    user_id: number
    user_type: number
    start: number
    length: number
}

export interface fetchMyFeed{
    user_id: number
    user_type: number
    start: number
    length: number
}

export interface sharePost{
    user_id: number
    user_type: number
    post_id: number
    username: string
}