import {IUser} from "@/types/index";

export interface IMessages {
    count: number
    next: string
    previous: string | null
    results: IMessageResults[]
}

export interface IMessageResults {
    body:  string
    chat_user: IChatUser
    avatar: string | null
    created_at: string
    file: null
    id: number
    is_read: false
    photo: string | null
    room: IRoom
    send_notification: boolean
    type: string
    updated_at: string
}

export interface IRoom {
    created_at: string
    name: string
    updated_at: string
    users: [number]
    uuid: string
}

export interface IChatUser {
    avatar: string | null
    created_at: string
    id: number
    is_online: boolean
    name: string
    updated_at: string
    user: IUser
}