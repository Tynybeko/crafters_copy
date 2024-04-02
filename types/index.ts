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
        get_full_name : string
        id : number
        image : string | null
        last_name : string
        middle_name : string
        phone : string | null
        role : string
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

export interface ICategories {
        id : number
        name : string
        description : string
        created_at : string
        updated_at : string
    }
    
export interface ISubcategories
    {
        id : number
        name : string
        description : string
        image : string
        category : number
    }

export interface IColors
    {
        id : number
        color : string
        name : string
    }

export interface ICurrency
    {
        id : number
        name : string
        code : string
    }