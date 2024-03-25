export interface InitialStateType<T>
    {
        data : T | null
        isLoading : boolean
        isError : boolean
        isAuth? : boolean
    }

export interface IUser
    {
        email : string
        first_name : string
        id : number
        image : string | null
        last_name : string
        middle_name : string
        phone : string | null
        token : string
    }