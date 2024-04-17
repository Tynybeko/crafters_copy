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
        city : string
        created_at : string
        id : number
        image : string
        index : number
        legal_address : string
        legal_name : string
        owner: IUser
        phone : string
        rate : number | null
        site_url : string
        updated_at : string
    }

export interface ICategories
    {
        id : number
        name : string
        description : string
        created_at : string
        updated_at : string
    }

export interface ISubcategories
    {
        category : number
        id : number
        name : string
        description : string
        image : string | null
    }

export interface IColor
    {
        color : string
        id : number
        name : string
    }

export interface IColors
    {
        color : IColor
        currency : ICurrency
        discount : number | null
        id : number
        images : ImagesTypes[]
        price : number
        quantity : number
    }

export interface ICurrency
    {
        id : number
        name : string
        code : string
    }

export interface IMyItems
    {
        id : number
        name : string
        description : string
        main_features : string
        category : number
        subcategory : number
        image : string
        price : number
        currency : ICurrency
    }

export interface ICurrency
    {
        code : string
        id : number
        name : string
    }

export interface ItemsTypes
    {
        category : ICategories
        code : string
        company : ICompany
        description : string
        id : number
        is_new : boolean
        is_popular : boolean
        main_features : string
        models_name : IModels[]
        name : string
        payment : IPayment | null
        subcategory : ISubcategories
    }

export interface IPayment
    {
        id : number
        created_at : string
        updated_at : string
        terms_of_payment : string
        delivery_conditions : string
    }

export interface IModels
    {
        colors : IColors[]
    }

export interface ImagesTypes
    {
        id : number
        image : string
    }