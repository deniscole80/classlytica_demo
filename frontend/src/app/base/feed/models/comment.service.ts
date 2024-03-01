export interface fetchComments{
    start: number
    length: number
    poster_id: number
    poster_type: number
    post_id: number
}

export interface createComments{
    user_id: number
    user_type: number
    post_id: number
    poster_id: number
    poster_type: number
    text: string
}