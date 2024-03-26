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

export interface ICompany
    {
        id : number
        legal_name : string
        legal_address : string
        phone : string
        city : string
        index : string
        site_url : string
        image : string
    }